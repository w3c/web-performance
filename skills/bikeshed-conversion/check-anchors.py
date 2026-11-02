#!/usr/bin/env python3
"""Verify that a ReSpec -> Bikeshed conversion kept the spec's anchors stable.

Compares a baseline of the spec as published with ReSpec (--before) against the
new Bikeshed build (--after), and fails if:

  * an id (URL fragment) from the baseline is gone, which breaks links into the
    spec from other specs, MDN, tests, issues, and the wider web; or
  * an exported definition (type + for + linking text) from the baseline is no
    longer exported, which breaks other specs' autolinks ([=term=], {{IDL}}).

Baselines (pass --before one or more times; local paths or URLs):
  * The ReSpec-rendered spec, e.g. from the W3C spec generator:
      https://www.w3.org/publications/spec-generator/?type=respec&url=https://w3c.github.io/<repo>/
    Not the ReSpec source file: most ids only exist once ReSpec has rendered it.
  * If the published spec has already switched to Bikeshed, webref's crawl from
    before the switch (https://github.com/w3c/webref). Find the last webref
    commit before the switch date, then pass its ids, dfns, and headings:
      gh api 'repos/w3c/webref/commits?until=<YYYY-MM-DD>&per_page=1' --jq '.[0].sha'
      --before https://raw.githubusercontent.com/w3c/webref/<sha>/ed/ids/<shortname>.json
      --before https://raw.githubusercontent.com/w3c/webref/<sha>/ed/dfns/<shortname>.json
      --before https://raw.githubusercontent.com/w3c/webref/<sha>/ed/headings/<shortname>.json
    <shortname> is webref's, which may include a level (e.g. hr-time-3).

Usage:
  check-anchors.py --before before.html --after after.html

Exits with status 1 if anything from the baseline is missing.
"""
import argparse
import json
import re
import sys
import urllib.request
from collections import defaultdict
from html.parser import HTMLParser
from urllib.parse import unquote

# Ids that ReSpec or Bikeshed regenerate on every build or that only exist at
# runtime. They have no Bikeshed equivalent and nothing should rely on them.
IGNORED = {
    "ref-for-* (backlinks)": r"ref-for-.*",
    "index-term-* (ReSpec terms index)": r"index-term-.*",
    "bib-* (ReSpec bibliography entries)": r"bib-.*",
    "webidl-<hash> (ReSpec IDL blocks)": r"webidl-\d+",
    "ReSpec note/issue wrappers": r"h-(note|issue|warning)(-\d+)?|issue-container-(generatedID|number)(-\d+)?",
    "ReSpec UI": r"(respec|dfn-panel)-.*|initialUserConfig|caniuse-stylesheet|back-to-top",
    "ReSpec boilerplate": r"actual-idl-index|issue-summary|(normative|informative)-references",
    "x<N>-* (ReSpec numbered headings)": r"x\d+(-\d+)*-.*",
    "toc-* (added at runtime by W3C fixup.js)": r"toc-(nav|jump|jump-text|toggle|expand-text|theme-toggle)",
}
HEADING_ALIAS = "ReSpec heading ids (aliases of section ids)"

IDL_TYPES = {
    "argument", "attribute", "callback", "const", "constructor", "dict-member",
    "dictionary", "enum", "enum-value", "exception", "extended-attribute",
    "interface", "method", "namespace", "typedef",
}


class SpecParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = {}  # id -> kind of element that carries it
        self.dfns = []
        self.heading_aliases = set()
        self._sections = []  # [section id, whether its heading was seen]
        self._dfn = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        element_id = attrs.get("id")
        is_heading = re.fullmatch(r"h[1-6]", tag)
        if element_id:
            kind = "heading" if is_heading or tag == "section" else tag
            if "example" in (attrs.get("class") or "").split():
                kind = "example"
            self.ids.setdefault(element_id, kind)
        if tag == "a" and attrs.get("name"):
            self.ids.setdefault(attrs["name"], "a")
        if tag == "section":
            self._sections.append([element_id, False])
        elif is_heading and self._sections and not self._sections[-1][1]:
            section_id = self._sections[-1][0]
            self._sections[-1][1] = True
            if element_id and section_id and element_id != section_id:
                # ReSpec gives a section's heading its own id next to the section's.
                self.heading_aliases.add(element_id)
        if tag == "dfn":
            self._dfn = {"attrs": attrs, "text": []}
            self.dfns.append(self._dfn)

    def handle_endtag(self, tag):
        if tag == "section" and self._sections:
            self._sections.pop()
        elif tag == "dfn":
            self._dfn = None

    def handle_data(self, data):
        if self._dfn is not None:
            self._dfn["text"].append(data)


def normalize(text):
    return " ".join(text.split())


def dfn_from_html(dfn):
    """Mirrors webref: linking texts come from data-lt if present, else the text."""
    attrs = dfn["attrs"]
    dfn_type = attrs.get("data-dfn-type") or "dfn"
    if "data-export" in attrs:
        public = True
    elif "data-noexport" in attrs:
        public = False
    else:
        public = dfn_type in IDL_TYPES
    if "data-lt" in attrs:
        texts = attrs["data-lt"].split("|")
    else:
        texts = ["".join(dfn["text"])]
    return {
        "id": attrs.get("id", ""),
        "type": dfn_type,
        "for": attrs.get("data-dfn-for") or "",
        "linkingText": texts,
        "public": public,
    }


def read(source):
    if re.match(r"https?://", source):
        with urllib.request.urlopen(source) as response:
            return response.read().decode("utf-8")
    with open(source, encoding="utf-8") as f:
        return f.read()


def load(source):
    """Returns (ids, dfns, heading aliases) from rendered HTML or webref JSON."""
    content = read(source)
    if source.endswith(".json") or content.lstrip().startswith("{"):
        data = json.loads(content)
        ids = {unquote(url.partition("#")[2]): "" for url in data.get("ids", [])}
        dfns = [{**d, "public": d.get("access") == "public"} for d in data.get("dfns", [])]
        for dfn in dfns:
            ids[dfn["id"]] = "dfn"
        headings = data.get("headings", [])
        for heading in headings:
            ids[heading["id"]] = "heading"
        aliases = {alias for h in headings for alias in h.get("alternateIds", [])}
        return ids, dfns, aliases
    parser = SpecParser()
    parser.feed(content)
    return parser.ids, [dfn_from_html(d) for d in parser.dfns], parser.heading_aliases


def link_form(text):
    # Argument lists don't matter for linking: foo(a, b) and foo() are the same.
    return re.sub(r"\(.*\)", "()", normalize(text))


def term_key(dfn_type, dfn_for, text):
    if isinstance(dfn_for, list):
        dfn_for = ",".join(dfn_for)
    fors = re.split(r",(?![^()]*\))", dfn_for)  # commas outside argument lists
    fors = tuple(sorted({link_form(f).lower() for f in fors if normalize(f)}))
    text = link_form(text) if dfn_type in ("method", "constructor") else normalize(text)
    if dfn_type not in IDL_TYPES:
        text = text.lower()
    return dfn_type, fors, text


def exported_terms(dfns):
    terms = {}
    for dfn in dfns:
        if dfn["public"]:
            for text in dfn["linkingText"]:
                if normalize(text):
                    terms.setdefault(term_key(dfn["type"], dfn["for"], text), dfn["id"])
    return terms


def variants(text):
    """Singular/plural forms that autolinkers may match instead of the exact text."""
    forms = {text + "s", text + "es"}
    if text.endswith("ies"):
        forms.add(text[:-3] + "y")
    if text.endswith("es"):
        forms.add(text[:-2])
    if text.endswith("s"):
        forms.add(text[:-1])
    if text.endswith("y"):
        forms.add(text[:-1] + "ies")
    return forms


def describe(key):
    dfn_type, fors, text = key
    where = f" for {', '.join(fors)}" if fors else ""
    return f'{dfn_type}{where} "{text}"'


def main():
    parser = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--before", action="append", required=True,
                        help="baseline: ReSpec-rendered HTML, or webref ids/dfns/headings JSON")
    parser.add_argument("--after", required=True, help="the Bikeshed build (HTML)")
    parser.add_argument("--show-ignored", action="store_true",
                        help="list the build-generated ids that are not checked")
    args = parser.parse_args()

    old_ids, old_dfns, aliases = {}, [], set()
    for source in args.before:
        ids, dfns, heading_aliases = load(source)
        for old_id, kind in ids.items():
            if kind or old_id not in old_ids:
                old_ids[old_id] = kind
        old_dfns += dfns
        aliases |= heading_aliases
    new_ids, new_dfns, _ = load(args.after)

    ignored = defaultdict(list)
    missing_ids = []
    for old_id in sorted(set(old_ids) - set(new_ids)):
        label = HEADING_ALIAS if old_id in aliases else next(
            (l for l, pattern in IGNORED.items() if re.fullmatch(pattern, old_id)), None)
        if label:
            ignored[label].append(old_id)
        else:
            missing_ids.append(old_id)

    old_terms = exported_terms(old_dfns)
    new_terms = exported_terms(new_dfns)
    missing_terms, variant_terms = [], []
    for key, old_id in sorted(old_terms.items()):
        if key in new_terms:
            continue
        dfn_type, fors, text = key
        variant = next((v for v in sorted(variants(text)) if (dfn_type, fors, v) in new_terms), None)
        if variant:
            variant_terms.append((key, old_id, variant))
        else:
            missing_terms.append((key, old_id))

    print(f"Baseline: {len(old_ids)} ids, {len(old_terms)} exported terms")
    print(f"New build: {len(new_ids)} ids, {len(new_terms)} exported terms")

    if missing_ids:
        print(f"\nFAIL: {len(missing_ids)} ids from the baseline are missing:")
        for old_id in missing_ids:
            kind = old_ids[old_id]
            print(f"  #{old_id}" + (f"  ({kind})" if kind else ""))
        print("  Fix: put the old id on the element that now holds that content"
              " (e.g. <dfn id=dfn-foo>, <h3 id=old-section-id>). To keep a new id"
              " too, add oldids=\"old-id\" instead (works on headings, dfns, and"
              " examples; on other elements such as <a> or <span>, use id).")

    if missing_terms:
        print(f"\nFAIL: {len(missing_terms)} exported terms are no longer exported:")
        for key, old_id in missing_terms:
            hints = sorted({describe(k) for k in new_terms if k[2] == key[2]})
            hint = f"; now exported as {', '.join(hints)}" if hints else ""
            print(f"  {describe(key)}  (was #{old_id}{hint})")
        print("  Fix: keep the dfn's type, for, and data-export, and list every old"
              " linking text in data-lt. Bikeshed's data-lt replaces the element's"
              " text; ReSpec's adds to it.")

    if variant_terms:
        print(f"\nWARN: {len(variant_terms)} exported terms only survive as a"
              " singular/plural variant:")
        for key, old_id, variant in variant_terms:
            print(f'  {describe(key)}  (was #{old_id}) -> "{variant}"')
        print("  Autolinkers usually match these; add the exact old text to data-lt"
              " to be safe.")

    if ignored:
        total = sum(len(ids) for ids in ignored.values())
        print(f"\nNot checked: {total} ids that the old build generated and that"
              " nothing should link to:")
        for label, ids in sorted(ignored.items(), key=lambda item: -len(item[1])):
            listed = ": " + " ".join(f"#{i}" for i in ids) if args.show_ignored else ""
            print(f"  {len(ids):4}  {label}{listed}")

    if missing_ids or missing_terms:
        return 1
    print("\nOK: every id and exported term from the baseline is still there.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
