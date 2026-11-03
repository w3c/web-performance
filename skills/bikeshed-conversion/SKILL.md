---
name: bikeshed-conversion
description: Convert a W3C spec from ReSpec (index.html) to Bikeshed (index.bs), keeping its anchors and exported terms stable
disable-model-invocation: true
allowed-tools: Bash(bikeshed *), Bash(pip *), Bash(rm *), Bash(python3 *), Bash(curl *), Bash(git status *), Bash(git diff *), Bash(git log *), Bash(gh *), Bash(ls *), Bash(mkdir *), Bash(identify *), Bash(file *), Read, Write, Edit, Grep, Glob, WebFetch, WebSearch, Task
argument-hint: "[path-to-repo]"
---

# Convert a W3C Spec from ReSpec to Bikeshed

Convert the ReSpec-based `index.html` in the current repo (or `$ARGUMENTS` if provided) to a Bikeshed `index.bs` file.

Use the resource-timing spec at `../resource-timing/index.bs` (relative to the repo) as a reference for Bikeshed patterns if it exists.

The spec's anchors must survive the move. Other specs, MDN, WPT, and issues link to its ids, and other specs autolink to its exported terms. A straight conversion silently breaks both, as it did for hr-time ([w3c/hr-time#173](https://github.com/w3c/hr-time/pull/173), [w3c/hr-time#175](https://github.com/w3c/hr-time/pull/175)). So capture a baseline before changing anything (step 1), keep anchors stable while converting, and verify against the baseline at the end (step 7).

## Step-by-step process

### 1. Capture the anchor baseline

Before changing anything, save the spec as ReSpec renders it. The ReSpec source isn't enough: ReSpec generates most ids (`dfn-*`, `dom-*`, section ids) and linking texts while rendering.

```bash
curl -sL -o /tmp/<repo>-before.html "https://www.w3.org/publications/spec-generator/?type=respec&url=https://w3c.github.io/<repo>/"
grep -c '<dfn' /tmp/<repo>-before.html  # must be more than 0
```

This only works while the live ED is still the ReSpec version you're converting. If the ED has already switched to Bikeshed, use webref's crawl from before the switch instead; `check-anchors.py --help` (in this skill's directory) explains how.

### 2. Read and understand the existing spec

- Read `index.html` to understand the full spec structure
- Identify the `respecConfig` object (title, editors, shortName, etc.)
- Identify all sections, IDL blocks, examples, notes, figures
- Identify all `data-cite` cross-spec references
- Identify any custom CSS or scripts

### 3. Create `index.bs`

#### Metadata block

Map `respecConfig` to a `<pre class='metadata'>` block:

| ReSpec | Bikeshed |
|--------|----------|
| `shortName` | `Shortname:` |
| `specStatus: "ED"` | `Status: ED` |
| `editors` | `Editor: Name, Affiliation URL, personal-url-or-email, w3cid NNNNN` |
| `formerEditors` | `Former Editor:` lines |
| `group` | `Group: webperf` |
| `github` | `Repository: w3c/repo-name` |
| `wgPublicList` | `Mailing List:` + `Mailing List Archives:` |
| `testSuiteURI` | `Test Suite:` |
| `caniuse` | `Include Can I Use Panels: yes` + `Can I Use URL:` (if needed) |

Also add:
- `Level: none` (unless spec has a level number)
- `Complain About: accidental-2119 yes`
- `Markup Shorthands: markdown no`
- `URL:` pointing to the ED URL
- `TR:` pointing to the TR URL
- Abstract text from `<section id="abstract">` into `Abstract:` metadata
- Custom SOTD content into `Status Text:` metadata (this appends to auto-generated W3C boilerplate)

Drop `mdn`, `xref`, `doJsonLd`, `subjectPrefix`, `highlightVars` (no Bikeshed equivalents / handled automatically).

#### Link defaults and anchors

Add `<pre class=link-defaults>` for cross-spec references that Bikeshed can't auto-resolve. Common ones:

```
spec:html; type:dfn; for:/; text:global object
spec:html; type:dfn; text:document
spec:html; type:interface; text:SharedWorker
spec:html; type:interface; text:BroadcastChannel
spec:infra; type:dfn; text:user agent
spec:service-workers; type:dfn; text:service worker timing info
```

Add `<pre class=anchors>` for references to specific spec anchors that Bikeshed doesn't know about. Format:

```
urlPrefix: https://html.spec.whatwg.org/multipage/; spec: HTML
    type: dfn
        urlPrefix: browsing-the-web.html
            text: unloading documents; url: #unloading-documents
```

#### Local bibliography

Convert `localBiblio` entries to a `<pre class=biblio>` JSON block. Make sure every local biblio entry is actually referenced with `[[REF-NAME]]` somewhere in the document, or Bikeshed will warn about unused entries.

#### Custom CSS

Keep any custom styling as an inline `<style>` block. Also add this rule so notes display a "Note" title (ReSpec does this automatically, Bikeshed does not):

```css
.note:not(.no-marker)::before {
  content: "Note";
}
```

#### Body content conversion

**Elements that work identically (no changes needed):**
- `<pre class='idl'>` blocks
- `<dfn>` with `data-dfn-for` attributes
- `{{InterfaceName/member}}` autolinks (use `/` not `.`)
- `[=term=]` definition links
- `[[SPEC-NAME]]` bibliography refs
- `<p class="note">`, `<div class="note">`
- `<pre class='example'>` blocks
- `|variable|` algorithm syntax (but NOT `|variable:type|` — see below)
- `<figure>`, `<figcaption>`, `<img>`

**Elements that need conversion:**
- **`data-cite="SPEC#anchor"` links** → Convert to `[=term=]`, `{{IDL}}`, or `<a>text</a>` with anchors block
- **`<dfn data-cite="SPEC#...">Term</dfn>`** → Convert to a link (not a `<dfn>`) since the definition lives externally, and keep its old id on that link (see "Keep anchors and exported terms stable")
- **`[[REF|display text]]`** → `<a href="...">display text</a> [[REF]]` (Bikeshed doesn't support `[[REF|text]]`)
- **`[[?REF]]` informative refs** → `[[REF]]` (Bikeshed defaults to informative; use `[[!REF]]` for normative)
- **`data-link-for` attributes** → `for=` attributes on `<a>` elements
- **`<section id="abstract">`** → Remove (content moved to metadata)
- **`<section id="sotd">`** → Remove (Bikeshed auto-generates SOTD boilerplate; use `Status Text:` metadata only for custom additions). Note: Bikeshed's ED boilerplate is shorter than ReSpec's — it omits patent policy text (that only appears for published statuses like WD/CR).
- **`<section id="conformance"></section>`** → Remove (Bikeshed auto-generates), but keep `#conformance` working (see "Keep anchors and exported terms stable")
- **`<section id="index"></section>` and `<section id="idl-index"></section>`** → Remove (Bikeshed auto-generates)
- **ReSpec `<script>` and `class='remove'` elements** → Remove entirely
- **`<section>` wrappers** → Remove; Bikeshed infers section boundaries from headings. Move each section's id to its heading.
- **`data-tests` attributes** → Keep as-is. Note: Bikeshed passes them through but does NOT render them as visible test links like ReSpec does.

**Non-normative sections:**
- Add `class='informative'` to `<h2>` for non-normative sections (Introduction, Privacy, Security)
- Add `<em>This section is non-normative.</em>` after each such heading

**Examples:**
- Keep each example's id from the baseline (ReSpec numbers examples that have none: `example-1`, `example-2`, ...). To give one a descriptive id, keep the old one with `oldids`: `<div class=example id=example-foo oldids=example-1>`
- Add `highlight='html'` or `highlight='js'` for syntax highlighting on code examples

**Exported definitions:**
- Add `data-export` to all `<dfn>` elements that define terms other specs might reference

**Images:**
- Add explicit `width` and `height` attributes to `<img>` tags to avoid Bikeshed warnings
- Get dimensions from the SVG `viewBox` attribute if it's an SVG

**Algorithm variables — CRITICAL (`|var:type|` is ReSpec-only):**
- ReSpec supports `|var:type|` syntax (e.g., `|timestamp:unsafe moment|`) to annotate variable types. **Bikeshed does NOT support this** — it renders the `|var:type|` text literally in the output, showing raw pipe characters and colons to readers.
- Convert ALL `|var:type|` occurrences to plain `|var|`. Drop the `:type` annotation entirely.
- After removing type annotations, Bikeshed warns about `|var|` references that appear only once in their scope. Fix by replacing every single-use `|var|` with `<var ignore>var</var>`.
- This applies to algorithm steps, example pseudo-algorithms, and cross-scope references to algorithm variables.
- After conversion, run `bikeshed -f spec` and fix ALL remaining single-use var warnings this way.

**Complex list items and markdown parser conflicts:**
- Bikeshed's markdown parser can conflict with `<ul>/<li>` elements that contain multiple `<p>` or `<div>` children, especially when `<dfn>` attributes span multiple lines. This causes "isn't indented enough to be valid Markdown" FATAL errors, even with `Markup Shorthands: markdown no`.
- Fix by either: (a) using Bikeshed's definition list markdown syntax (`: term` / `:: definition`) wrapped in a `<div>`, or (b) flattening multi-paragraph `<li>` content into simple inline text.
- Move any notes that were nested inside `<li>` elements to standalone `<p class="note">` elements after the list.

**Section wrapping for styling:**
- If a section needs special CSS (like an "Obsolete" section with a watermark), wrap it in a `<div id="...">` since Bikeshed doesn't create `<section>` wrappers. Give the `<h2>` a different explicit id to avoid duplicates.

#### Keep anchors and exported terms stable

Every id in the baseline must still exist, and every exported term must still be exported with the same type, `for`, and linking text. Step 7 checks both.

**Ids.** Bikeshed generates different ids than ReSpec, e.g. `#moment` instead of `#dfn-moment` for a concept, and `#performance` instead of `#dom-performance` for an interface. Wherever they differ, set the baseline's id explicitly:

```html
<!-- BAD: Bikeshed auto-generates an ID that may differ from the original -->
<dfn data-export>wall clock</dfn>

<!-- GOOD: Explicit ID preserves the anchor -->
<dfn data-export id=dfn-wall-clock>wall clock</dfn>
```

Typical ReSpec id patterns that get lost, from [w3c/hr-time#173](https://github.com/w3c/hr-time/pull/173):

| Type | Pattern | Example |
|------|---------|---------|
| Concept definitions | `dfn-{name}` | `id=dfn-wall-clock`, `id=dfn-monotonic-clock`, `id=dfn-duration` |
| Algorithm definitions | `dfn-{algorithm-name}` | `id=dfn-coarsen-time`, `id=dfn-duration-from` |
| IDL typedefs | `dom-{typename}` | `id=dom-domhighrestimestamp`, `id=dom-epochtimestamp` |
| IDL interfaces | `dom-{interface}` | `id=dom-performance` |
| IDL blocks | `idl-def-{name}` | `id=idl-def-domhighrestimestamp` |
| Compound concepts | `dfn-{hyphenated}` | `id=dfn-current-high-resolution-time`, `id=dfn-relative-high-resolution-coarse-time` |

Other ids that conversions lose:

- **Scoped definitions** keep their ids too, e.g. `id="wall-clock-unsafe-current-time"` for `<dfn data-dfn-for="wall clock">unsafe current time</dfn>`.
- **Section ids.** ReSpec takes a section's id from `<section id=...>`, or generates one from the heading text. When you drop the wrapper, put the baseline's id on the heading, even if it doesn't match how other sections are named. hr-time lost `#moments-and-durations` by renaming it `#sec-moments-and-durations`. ReSpec's numbered heading ids (`x2-1-...`) don't need to be kept.
- **Examples.** ReSpec numbers examples that have no id (`#example-1`, `#example-2`, in document order). Keep these ids (see "Examples" above).
- **IDL.** ReSpec also gives each IDL definition an `idl-def-*` id (e.g. `#idl-def-performance-now`). Keep these with `oldids` on the prose `<dfn>` for that construct (`<dfn data-export oldids=idl-def-performance-now>now()</dfn>`), or as the `id` of a `<pre class=idl>` block that defines only that construct.
- **External definitions.** A ReSpec `<dfn data-cite="SPEC#frag">` has a local id (e.g. `#dfn-date`). Once it's a plain link, keep the id on the link: `<a id=dfn-date href="...">Date</a>`.
- **Conformance.** ReSpec's `#conformance` is `#w3c-conformance` in Bikeshed. End the document with `<div id=conformance></div>`, which lands right before Bikeshed's Conformance section.

To keep an old id working next to a new one, use `oldids`: `<h3 id=new-id oldids="old-id,older-id">`. It works on headings, `<dfn>`s, and examples. On other elements, such as `<a>` or `<span>`, it does nothing, so use `id`.

**Exported terms.** Other specs autolink to exported terms by type, `for`, and linking text, so keep all three.

`data-lt` replaces the element's text in Bikeshed, but adds to it in ReSpec. `<dfn data-export data-lt="moment">coarsened moments</dfn>` exports "moment" and "coarsened moments" in ReSpec, but only "moment" in Bikeshed, which broke cross-spec references to it ([w3c/hr-time#175](https://github.com/w3c/hr-time/pull/175)). Add the text to `data-lt`: `data-lt="moment|coarsened moments"`.

When converting `<dfn>` elements inside a `<dl>` that describes IDL interface attributes, add the `attribute` keyword to each `<dfn>` so Bikeshed knows they define IDL attributes (not plain terms). The parent `<dl>` should have `dfn-for` set to the interface name.

```html
<!-- BAD: Bikeshed treats these as plain concept dfns -->
<dl dfn-for="PerformanceEntry" data-export>
  <dt><dfn>duration</dfn></dt>
  <dd>...</dd>
</dl>

<!-- GOOD: Bikeshed knows these are IDL attributes -->
<dl dfn-for="PerformanceEntry" data-export>
  <dt><dfn attribute>duration</dfn></dt>
  <dd>...</dd>
</dl>
```

Without the `attribute` keyword, Bikeshed won't correctly associate the dfn with the IDL attribute, and cross-references like `{{PerformanceEntry/duration}}` may fail to resolve.

### 4. Update CI and preview configs

**`.pr-preview.json`:**
```json
{
    "src_file": "index.bs",
    "type": "bikeshed"
}
```

**`.github/workflows/auto-publish.yml`:**
- Update the push trigger branch to `main` (repos converted to Bikeshed typically use `main` as the source branch, with `gh-pages` reserved for published output)
- Add `TOOLCHAIN: bikeshed`
- Add `GH_PAGES_BRANCH: gh-pages` so `spec-prod` deploys the built spec to GitHub Pages (without this, no deployment happens)
- Bump `actions/checkout` to `v4`
- Change `W3C_BUILD_OVERRIDE` to Bikeshed metadata format:
```yaml
W3C_BUILD_OVERRIDE: |
  Shortname: the-shortname
  Status: WD
```

### 5. Delete old files

- Delete `index.html` (replaced by `index.bs`)
- Delete `tidyconfig.txt` if present (no longer needed)
- Delete `.github/workflows/tidy.yml` if present (no longer needed)

### 6. Build and fix

Run `bikeshed -f spec index.bs` and fix ALL errors, warnings, and info messages iteratively until the build produces ZERO output.

**Common issues and fixes:**

| Issue | Fix |
|-------|-----|
| `\|var:type\|` rendered literally in output | **Critical**: `\|var:type\|` is ReSpec-only; convert to plain `\|var\|` |
| Single-use `\|var\|` warnings | Replace with `<var ignore>var</var>` |
| Obsolete RFC refs (e.g., RFC7234) | Use `[[RFC7234 obsolete]]` |
| Duplicate IDs | Add explicit `id=` to one element, or rename |
| Ambiguous dfn refs (origin, navigable, etc.) | Use explicit `<a href="...">` or add to link-defaults/anchors |
| Ambiguous local dfn with multiple `for` variants | Use explicit `<a href="#anchor-id">text</a>` |
| `[=Window/load=]` not found | HTML spec doesn't export it; use explicit `<a href>` |
| `{{Interface.member}}` not found | Use `{{Interface/member}}` (slash, not dot) |
| Duplicate `toJSON()` dfns | Add `data-dfn-for="InterfaceName"` to parent `<dl>` |
| RFC2119 keywords in non-normative sections | Wrap with `<span class=allow-2119>` |
| Image size warning | Add `width` and `height` attributes |
| Unexported dfn warnings | Add `data-export` to `<dfn>` elements |
| `reload`/`navigate` clashing with local enum values | Keep as explicit `<a href>` |
| `[[?REF]]` not parsed | Use `[[REF]]` (Bikeshed uses `[[!REF]]` for normative, no `?` prefix) |
| Markdown parser conflicts with `<li>` containing `<p>`/`<div>` | Restructure as definition list or flatten; move notes outside list |
| Multiple interfaces with same normalized ID (e.g. `Performance` vs `performance`) | Add explicit `id=` to one `<dfn>` |
| Unused local biblio entries | Remove unused entries or add `[[REF]]` citation in text |
| `[=Realm/global object=]` not found | Use `[=/global object=]` instead |
| Multiple possible refs for SharedWorker, BroadcastChannel, etc. | Add to `<pre class=link-defaults>` |

### 7. Verify

1. Build: `bikeshed -f spec index.bs` — must produce ZERO output (no errors, no warnings, no info messages). If there is ANY output, fix it before proceeding.
2. Check that every anchor survived. Build into a file outside the repo, then compare it with the baseline from step 1 using `check-anchors.py` from this skill's directory:
   ```bash
   bikeshed spec index.bs /tmp/<repo>-after.html
   python3 <skill-dir>/check-anchors.py --before /tmp/<repo>-before.html --after /tmp/<repo>-after.html
   ```
   It must end with `OK`. For every id or exported term it reports missing, fix `index.bs` as described in "Keep anchors and exported terms stable", then rerun. Fix `WARN` lines too. Don't edit the script's ignore list to make it pass. It only skips ids that ReSpec regenerates on every build (`ref-for-*`, `index-term-*`, numbered heading ids, ...), which `--show-ignored` lists.
3. Visually compare the rendered output with the current live spec
4. Verify: IDL blocks, cross-references, notes (with "Note" title), examples (highlighted, linkable), figures, SOTD content, non-normative markers, any special section styling
5. Check that `|var:type|` patterns do NOT appear literally in the rendered output — search the generated HTML for pipe characters followed by colons
6. Clean up generated `index.html` (don't commit the build artifact)
7. Mention in the PR description that `check-anchors.py` passed against the ReSpec baseline.
