# Field Note 001 — the four receipt screenshots

The post is written around four captures from **the mini's embedded instance**, and
they are deliberately NOT taken yet: they are captured after the console redress
(MAC-588, console PRs 1–5) lands, so the images show the design the reader is
looking at rather than the one it replaced.

Until then `<Screenshot pending />` renders a dashed frame naming what each will
show. Nothing renders a mockup or a stand-in.

| # | File the post asks for | What it must show |
|---|---|---|
| 1 | `public/field-notes/001/declared-reported.png` | **The hero image.** The device page's Declared / Reported / Because git said so / Verdict panels for Chrome 153.0.8010.37 — the panel E-130 quotes, and the one the post quotes twice (see below). |
| 2 | `public/field-notes/001/deploy-refusal.png` | **BLOCKED — do not capture until the post's deploy `[CHECK]` is settled.** The paragraph it illustrates quotes E-124's *fixture of the fix*, and what the mini did on 2026-09-04 was the opposite: it flipped the containers and refused afterwards. A screenshot of a refusal-before-touching would be a picture of something that has not happened on a device — E-124 says the fixed ordering "is not demonstrated on the mini". Settle the paragraph first; the frame follows it. |
| 3 | `public/field-notes/001/migration-change.png` | The repository-shape migration **as a change** — the diff and the gates over it (D-076). Its Applied row honestly reports having no receipt for who applied it or when (E-128); if that shows, keep it in frame. It is the post's own point. |
| 4 | `public/field-notes/001/change-queue.png` | The Changes queue with the Chrome change in it, Applied, carrying its commit — Open / Applied / Dismissed, the lifecycle MAC-588 PR 2 preserves exactly. |

**This table was rewritten 2026-09-12, and the rewrite is the point.** It had
been written against the *scaffolded* post from PR #3 and listed four frames —
`gates-refusing.png` and `apply-confirm.png` among them — that David's draft
never references, while missing two that it does. Capture day against the old
table would have produced two unusable images and two missing ones. The table
now lists exactly the four `src` paths in
`src/content/blog/001-the-air-installed-chrome.mdx`, and it has to keep listing
exactly those: if the post gains or loses a frame, this table changes in the same
commit.

Frames 1, 3 and 4 are console captures and the rules below govern them. Frame 2
is a terminal, so "light theme" and "crop to the panel" do not apply to it —
capture the refusal and the prompt around it, nothing else.

Capture rules, so the four read as one set:

- The mini's embedded instance, not a synthetic fixture.
- Light theme, since it is the site's default ground and the console's `:root`.
- Crop to the panel, not the whole browser chrome; no cursor, no tab bar.
- Redact nothing that is real; if something must be redacted, say so in the caption.

## Capture day also settles two quotations

Receipt 1 is not only an image. The post carries two strings **quoted from the
same panel** it shows:

1. the `<Receipt>` block at the top of the post — Declared / Reported / Because
   git said so / Verdict, quoted from E-130;
2. the console row under the verdict, the one beginning *"a package on a Mac
   proves the Mac has it, never on its own…"*.

Both were true of the console that rendered them on 2026-09-11, and David holds
that screenshot. But Receipt 1 is being **re-captured from the redesigned
console**, and a post may not quote words its own screenshot does not show.

**So at capture: set both strings to exactly what the live console renders, then
read them against the new pixels.** If the redress changed the wording, the post
changes with it — the quotation follows the console, never the other way round.
The row is marked `[CAPTURE]` in the post's source for this reason; that mark
comes out here, on this day, and not before.
