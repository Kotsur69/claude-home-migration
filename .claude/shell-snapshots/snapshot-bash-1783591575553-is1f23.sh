# Snapshot file
# Unset all aliases to avoid conflicts with functions
unalias -a 2>/dev/null || true
shopt -s expand_aliases
# Check for rg availability
if ! (unalias rg 2>/dev/null; command -v rg) >/dev/null 2>&1; then
  function rg {
  local _cc_bin="${CLAUDE_CODE_EXECPATH:-}"
  [[ -x $_cc_bin ]] || _cc_bin=/c/Users/mmazur/.local/bin/claude.exe
  if [[ ! -x $_cc_bin ]]; then command rg ${1+"$@"}; return; fi
  if [[ -n ${ZSH_VERSION:-} ]]; then
    ARGV0=rg "$_cc_bin" ${1+"$@"}
  elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "win32" ]]; then
    ARGV0=rg "$_cc_bin" ${1+"$@"}
  else
    (exec -a rg "$_cc_bin" ${1+"$@"})
  fi
}
fi
export PATH='/c/Users/mmazur/bin:/mingw64/bin:/usr/local/bin:/usr/bin:/bin:/mingw64/bin:/usr/bin:/c/Users/mmazur/bin:/c/Program Files/NVIDIA GPU Computing Toolkit/CUDA/v12.4/bin:/c/Program Files/NVIDIA GPU Computing Toolkit/CUDA/v12.4/libnvvp:/c/WINDOWS/system32:/c/WINDOWS:/c/WINDOWS/System32/Wbem:/c/WINDOWS/System32/WindowsPowerShell/v1.0:/c/WINDOWS/System32/OpenSSH:/c/Program Files/NVIDIA Corporation/NVIDIA App/NvDLISR:/c/Program Files (x86)/NVIDIA Corporation/PhysX/Common:/c/Program Files/NVIDIA Corporation/Nsight Compute 2024.1.0:/c/Program Files/nodejs:/c/Users/mmazur/AppData/Local/Programs/OpenAI/Codex/bin:/c/Program Files/NVIDIA GPU Computing Toolkit/CUDA/v12.4/bin:/c/Program Files/NVIDIA GPU Computing Toolkit/CUDA/v12.4/libnvvp:/c/WINDOWS/system32:/c/WINDOWS:/c/WINDOWS/System32/Wbem:/c/WINDOWS/System32/WindowsPowerShell/v1.0:/c/WINDOWS/System32/OpenSSH:/c/Program Files/NVIDIA Corporation/NVIDIA App/NvDLISR:/c/Program Files (x86)/NVIDIA Corporation/PhysX/Common:/c/Program Files/NVIDIA Corporation/Nsight Compute 2024.1.0:/c/Program Files/nodejs:/cmd:/c/Users/mmazur/AppData/Roaming/npm:/c/Users/mmazur/AppData/Local/Programs/Python/Python311:/c/Users/mmazur/AppData/Local/Programs/Python/Python311/Scripts:/c/Users/mmazur/.lmstudio/bin:/c/Users/mmazur/AppData/Local/GitHubCLI/bin:/usr/bin/vendor_perl:/usr/bin/core_perl:/c/Users/mmazur/.claude/plugins/cache/claude-plugins-official/frontend-design/unknown/bin:/c/Users/mmazur/.claude/plugins/cache/ui-ux-pro-max-skill/ui-ux-pro-max/2.6.2/bin:/c/Users/mmazur/.claude/plugins/cache/impeccable/impeccable/3.9.1/bin:/c/Users/mmazur/.claude/plugins/cache/anthropic-agent-skills/document-skills/9d2f1ae18723/bin:/c/Users/mmazur/.claude/plugins/cache/ecc/ecc/2.0.0/bin'
