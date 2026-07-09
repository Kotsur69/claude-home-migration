#!/usr/bin/env node
/**
 * Luna Statusline — standalone replacement for the ruflo statusline.
 *
 * Zero dependencies, cross-platform (Windows/macOS/Linux). Reads the JSON that
 * Claude Code pipes to a statusLine command on stdin and renders:
 *
 *   <model>  •  <ctx%>  •  <elapsed>  •  <mcp status>  •  $<cost>
 *
 * It intentionally does NOT shell out to any CLI (that is what made ruflo's
 * statusline slow and ruflo-dependent). ctx% is computed locally from the
 * session transcript; MCP status is read from the local Claude config.
 *
 * Env overrides:
 *   LUNA_SL_HIDE_COST=1        hide the cost segment
 *   LUNA_SL_COST_SYMBOL=$      change the cost symbol (e.g. ⚡, €)
 *   LUNA_SL_CTX_LIMIT=200000   context window size used for the % (default 200000)
 *   LUNA_SL_NOCOLOR=1          disable ANSI colors
 */
'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');

// ── ANSI helpers ────────────────────────────────────────────────
const NOCOLOR = /^(1|true|yes|on)$/i.test(process.env.LUNA_SL_NOCOLOR || '');
const c = (code, s) => (NOCOLOR ? s : `[${code}m${s}[0m`);
const cyan = (s) => c('96', s);    // model — bright cyan
const green = (s) => c('92', s);   // cost / ctx ok — bright green
const yellow = (s) => c('93', s);  // ctx warning — bright yellow
const red = (s) => c('91', s);     // ctx danger — bright red
const magenta = (s) => c('95', s); // elapsed time — bright magenta
const blue = (s) => c('94', s);    // mcp — bright blue
const gray = (s) => c('90', s);    // separators — bright black
const sep = gray('  •  ');

// ── read stdin JSON (best-effort) ───────────────────────────────
function readStdin() {
  try {
    const raw = fs.readFileSync(0, 'utf8');
    return raw ? JSON.parse(raw) : {};
  } catch (_) {
    return {};
  }
}

// ── ctx% from the session transcript ────────────────────────────
// Claude Code writes the session as JSONL at data.transcript_path. The last
// message carrying a usage block tells us how many tokens are currently in the
// context window (input + both cache tiers). We tail the file so large
// sessions stay cheap.
function contextPct(data) {
  const limit = Number(process.env.LUNA_SL_CTX_LIMIT || 200000);
  const tp = data.transcript_path;
  try {
    if (!tp || !fs.existsSync(tp)) {
      // Fallback: coarse native signal.
      if (data.exceeds_200k_tokens) return { pct: 100, tokens: null };
      return null;
    }
    const stat = fs.statSync(tp);
    const readBytes = Math.min(stat.size, 262144); // last 256 KB
    const fd = fs.openSync(tp, 'r');
    const buf = Buffer.alloc(readBytes);
    fs.readSync(fd, buf, 0, readBytes, stat.size - readBytes);
    fs.closeSync(fd);
    const lines = buf.toString('utf8').split('\n').filter(Boolean);
    for (let i = lines.length - 1; i >= 0; i--) {
      let obj;
      try { obj = JSON.parse(lines[i]); } catch (_) { continue; }
      const u = (obj.message && obj.message.usage) || obj.usage;
      if (u && (u.input_tokens != null || u.cache_read_input_tokens != null)) {
        const used =
          (u.input_tokens || 0) +
          (u.cache_read_input_tokens || 0) +
          (u.cache_creation_input_tokens || 0);
        return { pct: Math.min(100, Math.round((used / limit) * 100)), tokens: used };
      }
    }
  } catch (_) { /* ignore */ }
  return null;
}

// ── MCP status from local config ────────────────────────────────
// Native stdin carries no live MCP handshake state, so we report the number of
// MCP servers that are actually wired up: user (~/.claude.json) + project
// (.mcp.json) + every ENABLED plugin's own .mcp.json (disabled plugins skipped,
// so a turned-off ruflo no longer counts). Deduped by server name, cached 30s
// so rapid re-renders don't re-scan the plugin tree.
function readJSON(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch (_) { return null; }
}
function mcpStatus() {
  const cacheFile = path.join(os.tmpdir(), 'luna-sl-mcp.json');
  try {
    const st = fs.statSync(cacheFile);
    if (Date.now() - st.mtimeMs < 30000) return readJSON(cacheFile).count;
  } catch (_) { /* stale/missing → recompute */ }

  const home = os.homedir();
  const names = new Set();
  const add = (o) => { if (o && typeof o === 'object') Object.keys(o).forEach((k) => names.add(k)); };

  const uj = readJSON(path.join(home, '.claude.json'));
  if (uj) add(uj.mcpServers);
  const pj = readJSON(path.join(process.cwd(), '.mcp.json'));
  if (pj) add(pj.mcpServers);

  const settings = readJSON(path.join(home, '.claude', 'settings.json')) || {};
  const enabled = settings.enabledPlugins || {};
  const installed = readJSON(path.join(home, '.claude', 'plugins', 'installed_plugins.json'));
  if (installed && installed.plugins) {
    for (const pname of Object.keys(installed.plugins)) {
      if (enabled[pname] === false) continue; // skip disabled plugins (e.g. ruflo)
      for (const inst of installed.plugins[pname]) {
        if (!inst || !inst.installPath) continue;
        const mj = readJSON(path.join(inst.installPath, '.mcp.json'));
        if (mj) add(mj.mcpServers);
      }
    }
  }

  const count = names.size;
  try { fs.writeFileSync(cacheFile, JSON.stringify({ count, names: [...names] })); } catch (_) {}
  return count;
}

// ── formatting ──────────────────────────────────────────────────
function fmtDuration(ms) {
  if (!ms || ms < 0) return null;
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h) return `${h}h${String(m).padStart(2, '0')}m`;
  if (m) return `${m}m${String(sec).padStart(2, '0')}s`;
  return `${sec}s`;
}

function ctxColor(pct) {
  if (pct >= 85) return red;
  if (pct >= 60) return yellow;
  return green;
}

// ── main ────────────────────────────────────────────────────────
function main() {
  const data = readStdin();
  const parts = [];

  // model
  const model =
    (data.model && (data.model.display_name || data.model.id)) || 'claude';
  parts.push(cyan(model));

  // ctx%
  const ctx = contextPct(data);
  if (ctx) parts.push(ctxColor(ctx.pct)(`${ctx.pct}% ctx`));

  // elapsed
  const dur = fmtDuration(data.cost && data.cost.total_duration_ms);
  if (dur) parts.push(magenta(dur));

  // mcp — leading status dot: green when servers are wired up, gray when none
  const mcp = mcpStatus();
  parts.push((mcp > 0 ? green('●') : gray('●')) + blue(` mcp ${mcp}`));

  // cost
  const hideCost = /^(1|true|yes|on)$/i.test(process.env.LUNA_SL_HIDE_COST || '');
  if (!hideCost && data.cost && typeof data.cost.total_cost_usd === 'number') {
    const sym = process.env.LUNA_SL_COST_SYMBOL ?? '$';
    parts.push(green(`${sym}${data.cost.total_cost_usd.toFixed(2)}`));
  }

  process.stdout.write(parts.join(sep));
}

main();
