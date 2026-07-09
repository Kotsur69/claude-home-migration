---
name: claude-tooling-setup
description: "Mateusz's Claude Code tooling decisions — design-skill lane, installed skills/MCP, lean solo-dev philosophy"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 8e2df249-2503-4e37-8a9f-685cb01731bd
---

Decisions made 2026-07-08 about the user's Claude Code / Luna setup.

**Design-skill lane (user's pick):** keep **`ui-ux-pro-max` as the MAIN** design skill + **`design-motion-principles`** for animation. Deprioritize / treat as background the overlapping ones (taste cluster: design-taste-frontend/gpt-taste/high-end-visual-design/redesign-existing-projects/full-output-enforcement; `impeccable`; `frontend-design`). Reason: four overlapping "make UI good" skills dilute each other; curation > accumulation.

**Installed this session (all active next launch):** `shadcn` MCP (user-global, connected); skills via `npx skills add` (global): design-motion-principles + the 5-skill taste cluster; plugins via `/plugin`: ui-ux-pro-max, impeccable, anthropics/skills → document-skills (xlsx/pdf/docx/pptx). `frontend-design` was already present. 21st.dev Magic — skipped (overlaps shadcn).

**How the user wants to work ("Luna"):** speak in natural language ("make me good frontend colours, bla bla") and have Luna auto-pull the right skills/tools — NO `/commands`. This already works: skills auto-fire on their descriptions; slash commands are only for meta-actions (`/plugin`, `/code-review`). Does NOT use swarms (needs a different Anthropic subscription).

**Lean solo-dev philosophy (Luna's advice the user is aligning to):** fewer sharper tools + strong context beats a sprawling library. Keep: one design lane + `design-motion`, `document-skills`, `shadcn` MCP, `context7` MCP (current lib docs — high value across Next.js/FastAPI/Celery/ComfyUI), `playwright` MCP (UI verify + relevant to synthara automation). Cut: ruflo swarm machinery. Highest-leverage next step: a sharp global + per-project **CLAUDE.md** encoding stack + taste + "use skill X for task Y". See [[pending-followups]].

**User's project range (setup must serve both):** practical web apps ([[steelquote_project]], SafetyHub) AND ambitious AI/ML/infra products — e.g. **synthara** (private, github.com/Kotsur69/synthara): AI creator platform, multi-persona social automation, FastAPI + Celery + ComfyUI + n8n + Next.js + Postgres/Redis + Prometheus/Grafana, Dockerized single-PC.

**Clarified 2026-07-09:** "deprioritize" the taste-cluster design skills (design-taste-frontend/gpt-taste/high-end-visual-design/redesign-existing-projects) means auto-routing only (CLAUDE.md keeps `ui-ux-pro-max` as the sole main). When asked directly whether to also toggle them off in `/skills`, user chose to leave them all enabled — he's fine with the token overhead of having them available for explicit/manual invocation. Don't re-flag this as a contradiction; it's a confirmed choice, not drift.
