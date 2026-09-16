# Fonts: one source of truth, two carriage mechanisms

**Ratified 2026-09-11 (MAC-588).** The site takes IBM Plex Sans and IBM Plex Mono
from pinned `@fontsource` packages:

- `@fontsource/ibm-plex-sans`
- `@fontsource/ibm-plex-mono`

That is **provenance, not convenience**. A pinned npm package plus the lockfile's
integrity hash is a named source with a digest attached; the OFL licence travels
inside the package; and because the files are served from this origin, the runtime
makes **zero third-party requests** — verified against the built output, not
assumed.

## For the console's later Plex adoption

The admin console has no npm and is not getting one. When it moves off the system
stack onto Plex, it does **not** independently download fonts from anywhere:

1. Copy the exact `.woff2` files out of **this repository's pinned @fontsource
   package** — the same bytes this site serves.
2. **Record the digests** of the copied files in the console's repository, next to
   the assets, so the two copies can be shown to be the same bytes rather than
   assumed to be.
3. Vendoring those files is a change with a licence check attached (the console's
   own stylesheet says so, and ICEBOX.md holds the item); the OFL text travels with
   them.

One source of font truth, two carriage mechanisms — the same shape as the Preline
ruling: the licence and the attribution travel with the artifact, and the second
copy is verifiable against the first rather than merely similar to it.

## Weights the site actually ships

| Family | Weights | Where |
|---|---|---|
| IBM Plex Sans | 400, 400 italic, 600 | body, headings, the faint-italic treatment |
| IBM Plex Mono | 400, 500 | eyebrows, receipts, datelines, the wordmark |

Adding a weight means adding an `@import` in `src/styles/global.css`. Nothing
loads a weight it does not use.
