---
name: witmind-ha-release-guard
description: Protect Witmind Home Assistant panel releases from bridge entry-point failures. Use when building, publishing, promoting, rolling back, or verifying a release under www/witmind-ui; do not use for ordinary frontend edits that are not being deployed.
---

# Witmind Home Assistant Release Guard

Preserve the deployment contract between the Home Assistant bridge and the isolated Witmind application.

## Non-negotiable contract

- The Vite panel build produces `dist-panel/witmind-ui.html`.
- The bridge loads `/local/witmind-ui/releases/<version>/index.html`.
- Therefore every published release must contain `index.html`, never only `witmind-ui.html`.
- Publish through `tools/release.ps1 -Version <semver>`. That script performs the required rename and copies the hashed assets.
- Never overwrite an existing release directory. Create a new semantic version for every correction.
- Do not change `current.json` until the new release entry and every referenced asset have returned HTTP 200.

## Safe release sequence

1. Run the relevant tests and `npm run build:panel` or let `tools/release.ps1` rebuild.
2. Confirm the target version does not already exist under `\\192.168.20.232\config\www\witmind-ui\releases`.
3. Run `tools/release.ps1 -Version <version>` instead of copying `dist-panel` manually.
4. Confirm the release contains `index.html` and `assets/`. Treat a release containing only `witmind-ui.html` as invalid.
5. Before promotion, request the new `index.html`, parse its `src` and `href` asset references, and require HTTP 200 for all of them.
6. Back up the current `current.json` under `/config/backups/<descriptive-name>/current.json`.
7. Promote with `tools/promote.ps1 -Version <version>`.
8. Fetch `current.json` with a cache-busting query, resolve the version it names, and repeat the entry-plus-assets HTTP check through that stable path.
9. If this release fixes a bug, regression, or introduces a stability/gesture improvement, append the entry to `.agents/skills/witmind-failure-history/SKILL.md` following its technical structure.

If any check fails, stop before promotion. If failure is discovered after promotion, promote the last verified release; a Home Assistant restart is not required for a pointer rollback.

## Verification evidence

Report the promoted version, backup path, entry URL, and HTTP results for `current.json`, `index.html`, JavaScript, and CSS. Do not claim the release works merely because Samba contains files.
