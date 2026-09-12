# Claims charter — what the mngd site and blog may and may not say

Every claim on the site must be true of the product as deployed today. This file
governs the marketing site and every Field Note. When in doubt, say less.

## Never claim
- That mngd invented git-based / GitOps device management. Prior art is established:
  Fleet (configs in git, PR review before devices) and Zentral (GitOps Apple MDM via
  Terraform, protected branches, mandatory PR review).
- That mngd invented Declarative Device Management. DDM is Apple's; mngd vendors
  Apple's own apple/device-management schema.
- That mngd is first to install apps from a URL or a catalog. Installomator, Munki,
  Jamf App Installers, and Kandji are prior art.
- Any absolute — "first", "only", "no one else", "world's first" — anywhere.

## May claim (as observation, never as superlative; cite the EVIDENCE entry)
- The repository lives inside the product: mngd hosts the fleet repository itself;
  propose, review, gates, and merge happen in the console with no forge, no external
  CI service, no token.
- Gates run in-process and refuse in plain English, citing their own decision history.
- Apply's confirmation carries the exact commit it showed you.
- The customer's repository clones out whole, with its history.
- Desired state and device-reported state sit side by side; when the console says an
  app is installed, that is the device attesting it, not the server assuming it.
  [receipt: E-130 — Chrome 153.0.8010.37 on the Air]
- Ceiling on all of the above: "We haven't seen another MDM that hosts the repository
  itself." Observation, not a firstness claim.

## Must credit (visibly, in a built-on section linked from the footer and every post)
- Apple's Declarative Device Management and the apple/device-management schema.
- Jesse Peterson and the MicroMDM project: NanoMDM, NanoCMD, KMFDDM, nanodep.
- go-git.
- Installomator (the MacAdmins community) — inspiration for the app-catalog direction.
- Preline UI (MIT) — the component system this site and console are built with.
- A sentence acknowledging Fleet and Zentral as config-as-code fellow travelers.

## Standing rules
- No invented testimonials, customer logos, "trusted by" counts, or usage numbers.
- No page marketing a capability that isn't shipping.
- Every technical claim traces to an EVIDENCE.md entry in the mngd repo. If it isn't
  receipted there, it doesn't go on the site.
