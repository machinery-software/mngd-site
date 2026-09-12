# Field Note 001 — the four receipt screenshots

The post is written around four captures from **the mini's embedded instance**, and
they are deliberately NOT taken yet: they are captured after the console redress
(MAC-588, console PRs 1–5) lands, so the images show the design the reader is
looking at rather than the one it replaced.

Until then `<Screenshot pending />` renders a dashed frame naming what each will
show. Nothing renders a mockup or a stand-in.

| # | File to drop in | What it must show |
|---|---|---|
| 1 | `public/field-notes/001/change-queue.png` | The Changes queue with the Chrome change in it — Open / Applied / Dismissed, the lifecycle MAC-588 PR 2 preserves exactly. |
| 2 | `public/field-notes/001/gates-refusing.png` | A gate refusing in plain English, with the recovery command it recommends (E-125's rule: the command must be able to succeed against the state that produced it). |
| 3 | `public/field-notes/001/apply-confirm.png` | Apply's confirmation carrying the exact commit it showed — the fast-forward law made visible (E-116). |
| 4 | `public/field-notes/001/declared-reported.png` | The device page's Declared / Reported / Verdict panels for Chrome 153.0.8010.37, the panel E-130 quotes. |

Capture rules, so the four read as one set:

- The mini's embedded instance, not a synthetic fixture.
- Light theme, since it is the site's default ground and the console's `:root`.
- Crop to the panel, not the whole browser chrome; no cursor, no tab bar.
- Redact nothing that is real; if something must be redacted, say so in the caption.
