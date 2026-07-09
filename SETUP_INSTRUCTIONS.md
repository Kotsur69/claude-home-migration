# Home PC Setup — Claude Code (LunaCore)

Instructions for Claude Code running on the home PC to reconfigure itself from this migration package. Read this fully before touching anything. Package source: work PC (`C:\Users\mmazur\.local\bin`), captured 2026-07-09.

## 0. Prerequisites (check/install first, in order)

1. **Node.js** (LTS) — required for the Claude Code CLI itself and for `luna-statusline.cjs` (the custom statusline is a `.cjs` script invoked via `node`). Verify: `node -v`, `npm -v`.
2. **Git** — required for plugin marketplaces (they're git clones) and any project repos. Verify: `git --version`.
3. **Claude Code CLI** — install/update via npm: `npm install -g @anthropic-ai/claude-code`. This is a global npm package, NOT part of this migration folder — must be installed fresh.

## 1. Place the config files

Copy from this package into the home PC user profile:

| From (this package) | To (home PC) |
|---|---|
| `.claude.json` | `C:\Users\<username>\.claude.json` |
| `.claude\` (whole folder) | `C:\Users\<username>\.claude\` |
| `.agents\` (whole folder) | `C:\Users\<username>\.agents\` |

**Important:** for the statusline command and per-project settings to resolve correctly without edits, the home PC Windows username should also be `mmazur`. If it's different, `settings.json`'s `statusLine.command` (hardcoded path `C:\Users\mmazur\.claude\helpers\luna-statusline.cjs`) and the `"projects"` keys inside `.claude.json` will need path updates — do a find/replace of `C:\Users\mmazur` → the new path before or after copying.

## 2. Log in

Credentials were deliberately **not** included in this package (security — never copy `.credentials.json` across machines). Run Claude Code and complete the login flow fresh on the home PC.

## 3. Reinstall plugins fresh (don't trust the copied plugin cache)

The migration package's `plugins/marketplaces/*` folders are missing their `.git` directories (stripped/not portable), so git-based plugin updates won't work if you just rely on the copied cache. Re-add each marketplace and reinstall instead — fast, and guarantees clean update tracking:

```
/plugin marketplace add https://github.com/affaan-m/ECC.git
/plugin install ecc@ecc

/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
/plugin install ui-ux-pro-max@ui-ux-pro-max-skill

/plugin marketplace add pbakaus/impeccable
/plugin install impeccable@impeccable

/plugin marketplace add anthropics/skills
/plugin install document-skills@anthropic-agent-skills
```

`frontend-design@claude-plugins-official` comes from the official Anthropic marketplace — should already be available by default; install if not present.

**Do NOT install ruflo.** It was deliberately removed (see `.claude/CLAUDE.md` and the `ecc-vs-ruflo-decision` memory note under `.claude/projects/*/memory/`) — POSIX-only hooks, dead on Windows, conflicts with the lean solo-dev approach. Fully purged from this package already; skip it.

**Do NOT run `install.ps1 --profile full`** after installing the ECC plugin — causes duplicate hooks/commands. The plugin alone loads skills + commands + hooks.

## 4. MCP servers

`shadcn` MCP is configured in `.claude.json` (via `npx shadcn@latest mcp`, no extra install needed — resolves on first use since it's npx-based).

## 5. Verify the statusline / dashboard

`.claude/helpers/luna-statusline.cjs` + `.claude/settings.json`'s `statusLine.command` should just work once paths match (see step 1). It's a custom dashboard (mini stats line + context-zone LEDs + "LunaCore" wordmark) — if it ever regresses to a plain default line, rebuild instructions are in the `lunacore-statusline` memory note (`.claude/projects/*/memory/lunacore_statusline.md`). A backup of a prior version sits at `.claude/helpers/luna-statusline.prev.cjs`.

Also present: `.claude/helpers/lunacore-cheatsheet.html` and `.claude/helpers/ecc-sciagawka-mati.html` — local cheatsheet copies (kept local because the work PC's corporate Zscaler proxy blocks claude.ai artifact links; may not be needed on home PC, but harmless to keep).

## 6. Sanity checks after setup

- `.claude/CLAUDE.md` — global auto-routing rules (design skill lane, PL/EN language matching, "Luna" persona) should already be in place, no action needed.
- `.claude/rules/ecc/**` — per-language rule sets (common/typescript/react/web/python), already bundled, no action needed.
- Read `.claude/projects/*/memory/MEMORY.md` for full context index before starting real work — it links to all other memory notes (user prefs, project status, prior decisions).

## 7. Not included — set up separately

This package only contains Claude Code config, not actual project code. Clone/sync these separately if needed on the home PC:
- `AMSteel_Quote` (SteelQuote) — normally at `C:\Users\mmazur\source\repos\AMSteel_Quote`
- `safetyhub_bhp` (SafetyHub BHP) — normally at `C:\Users\mmazur\source\repos\safetyhub_bhp`
- `Remotion vids` — normally at `C:\Users\mmazur\source\repos\Remotion vids`

Each has its own `STAN_PROJEKTU.md` with project-specific setup notes.
