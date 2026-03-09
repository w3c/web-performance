---
name: bikeshed-conversion
description: Guidelines for converting W3C specs to Bikeshed format. Covers anchor ID preservation, dfn handling, and common pitfalls. Read this before any Bikeshed conversion or migration work.
---

# Bikeshed Conversion

## Preserving Anchor IDs

When converting a spec to Bikeshed, **anchor IDs used by other specifications must be preserved**. Bikeshed auto-generates IDs for `<dfn>` elements based on their text content, but these auto-generated IDs often differ from the IDs that were in the original spec. Other specs link to these IDs, so changing them silently breaks cross-spec references.

### The Problem

Bikeshed generates IDs like `dfn-wall-clock` from `<dfn>wall clock</dfn>`, but the original spec may have used a different ID or no explicit ID (relying on the HTML spec's own ID generation). When other W3C specs reference anchors like `#dfn-wall-clock`, `#dom-performance`, or `#dfn-coarsen-time`, those links break if the IDs change.

### The Fix

Always add explicit `id` attributes to `<dfn>` elements to preserve the anchors other specs depend on:

```html
<!-- BAD: Bikeshed auto-generates an ID that may differ from the original -->
<dfn data-export>wall clock</dfn>

<!-- GOOD: Explicit ID preserves the anchor -->
<dfn data-export id=dfn-wall-clock>wall clock</dfn>
```

### Common ID Patterns to Preserve

Based on [w3c/hr-time#173](https://github.com/w3c/hr-time/pull/173), these are typical ID patterns that get lost:

| Type | Pattern | Example |
|------|---------|---------|
| Concept definitions | `dfn-{name}` | `id=dfn-wall-clock`, `id=dfn-monotonic-clock`, `id=dfn-duration` |
| Algorithm definitions | `dfn-{algorithm-name}` | `id=dfn-coarsen-time`, `id=dfn-duration-from` |
| IDL typedefs | `dom-{typename}` | `id=dom-domhighrestimestamp`, `id=dom-epochtimestamp` |
| IDL interfaces | `dom-{interface}` | `id=dom-performance` |
| IDL blocks | `idl-def-{name}` | `id=idl-def-domhighrestimestamp` |
| Compound concepts | `dfn-{hyphenated}` | `id=dfn-current-high-resolution-time`, `id=dfn-relative-high-resolution-coarse-time` |

### Checklist

When converting a spec to Bikeshed:

1. **Inventory all `<dfn>` elements** in the original spec and note their IDs
2. **Check for cross-spec references** — search other W3C specs that link to this spec's anchors (use [xref](https://respec.org/xref/) or grep the spec's URL in other repos)
3. **Add explicit `id` attributes** to every `<dfn>` that had an ID in the original, matching the original ID exactly
4. **Verify after conversion** — build the Bikeshed output and confirm all anchors from the original spec still resolve
5. **Check `data-dfn-for` scoping** — Bikeshed uses `data-dfn-for` to scope definitions; make sure scoped dfns also retain their original IDs (e.g., `id="wall-clock-unsafe-current-time"` for `<dfn data-dfn-for="wall clock">unsafe current time</dfn>`)
