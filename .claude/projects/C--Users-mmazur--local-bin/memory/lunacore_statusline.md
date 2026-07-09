---
name: lunacore-statusline
description: "LunaCore terminal statusline/dashboard — file location, design, ctx-ball thresholds, and cheatsheet artifact IDs (rebuild reference so it's never lost again)"
metadata: 
  node_type: memory
  type: project
  originSessionId: a50e9cda-bf49-4125-bc94-bd2efd1f15f3
---

**LunaCore** = Mati's custom Claude Code setup, in TWO parts (his split, confirmed 2026-07-09):
1. **Terminal dashboard** = the statusline `C:\Users\mmazur\.claude\helpers\luna-statusline.cjs` (wired via `~/.claude/settings.json` → `statusLine.command`). NOT on the web.
2. **Web = cheatsheet only** (the HTML artifacts below).

Statusline layout (5 lines): mini-dashboard (`model • ●N% ctx • elapsed • ●mcp N • $cost`) + three context LEDs as a **legend** (current zone bright, others dimmed) + cheat hint (`Ctrl+]`) + `solo · lean · v1` tagline, with a big block **"LunaCore"** wordmark on the RIGHT (LUNA cyan `96`, CORE magenta `95`).

Context-ball zones (canonical, from the "LunaCore // dash" artifact — override via env `LUNA_SL_CTX_WARN`/`LUNA_SL_CTX_DANGER`):
- 🟢 green `<60%` — "send it"  · 🟡 amber `60–85%` — "compact maybe?" · 🔴 red `>85%` — "compact this shit"

Design tokens: dark mono, cyan `#22d3ee` → magenta `#f472b6` gradient. Env flags: `LUNA_SL_ART=0` (hide wordmark), `LUNA_SL_HIDE_COST=1`, `LUNA_SL_NOCOLOR=1`, `LUNA_SL_CTX_LIMIT`.

Cheatsheet artifacts (owned by Mati; his corporate **Zscaler proxy blocks claude.ai artifacts → ERR_BLOCKED_BY_CSP**, so keep a LOCAL copy at `C:\Users\mmazur\.claude\helpers\lunacore-cheatsheet.html`):
- `f3981a16-0794-4fd7-8a62-fd1f2f08d4fa` — "LunaCore // dash" (branded, compact — the primary cheatsheet)
- `5c3f7079-0816-4e0d-b08d-45cd1ae9633b` — "ECC — ściągawka Mati" (detailed PL command reference)

**Why:** the rich statusline got overwritten back to a lean single-liner during the ECC install/restart on 2026-07-09; no local backup existed. **How to apply:** if it regresses again, rebuild from this file + the artifacts; a backup of any prior version sits next to it as `luna-statusline.prev.cjs`. Related: [[ecc-vs-ruflo-decision]], [[claude-tooling-setup]].
