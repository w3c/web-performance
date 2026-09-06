# Common ID Patterns to Preserve

Based on [w3c/hr-time#173](https://github.com/w3c/hr-time/pull/173), these are typical ID patterns that get lost during Bikeshed conversion:

| Type | Pattern | Example |
|------|---------|---------|
| Concept definitions | `dfn-{name}` | `id=dfn-wall-clock`, `id=dfn-monotonic-clock`, `id=dfn-duration` |
| Algorithm definitions | `dfn-{algorithm-name}` | `id=dfn-coarsen-time`, `id=dfn-duration-from` |
| IDL typedefs | `dom-{typename}` | `id=dom-domhighrestimestamp`, `id=dom-epochtimestamp` |
| IDL interfaces | `dom-{interface}` | `id=dom-performance` |
| IDL blocks | `idl-def-{name}` | `id=idl-def-domhighrestimestamp` |
| Compound concepts | `dfn-{hyphenated}` | `id=dfn-current-high-resolution-time`, `id=dfn-relative-high-resolution-coarse-time` |
