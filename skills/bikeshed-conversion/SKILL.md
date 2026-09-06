---
name: bikeshed-conversion
description: "Convert W3C ReSpec documents to Bikeshed (.bs) format — preserves anchor IDs, handles dfn elements and IDL attributes, resolves cross-spec references, and avoids common formatting pitfalls. Use when doing any respec-to-bikeshed migration, spec format conversion, or .bs markup work."
---

# Bikeshed Conversion

## Preserving Anchor IDs

**Always preserve anchor IDs from the original spec.** Bikeshed auto-generates IDs for `<dfn>` elements that often differ from the originals, breaking cross-spec references.

Add explicit `id` attributes to every `<dfn>`:

```html
<!-- BAD -->
<dfn data-export>wall clock</dfn>

<!-- GOOD -->
<dfn data-export id=dfn-wall-clock>wall clock</dfn>
```

See [ID_PATTERNS.md](ID_PATTERNS.md) for the full table of ID naming conventions (`dfn-*`, `dom-*`, `idl-def-*`) based on [w3c/hr-time#173](https://github.com/w3c/hr-time/pull/173).

## IDL Attribute Definitions

Add the `attribute` keyword to `<dfn>` elements inside IDL `<dl>` blocks so Bikeshed treats them as IDL attributes, not plain terms:

```html
<!-- BAD -->
<dl dfn-for="PerformanceEntry" data-export>
  <dt><dfn>duration</dfn></dt>
</dl>

<!-- GOOD -->
<dl dfn-for="PerformanceEntry" data-export>
  <dt><dfn attribute>duration</dfn></dt>
</dl>
```

## Conversion Checklist

1. **Inventory all `<dfn>` elements** in the original spec and note their IDs
2. **Check for cross-spec references** — search other W3C specs that link to this spec's anchors (use [xref](https://respec.org/xref/) or grep the spec's URL in other repos)
3. **Add explicit `id` attributes** to every `<dfn>`, matching the original ID exactly
4. **Verify after conversion** — build with `bikeshed --die-on=warning` and confirm all anchors resolve. If anchors are missing, check for `Missing dfn` errors and compare generated IDs against originals
5. **Check `data-dfn-for` scoping** — ensure scoped dfns retain their original IDs
