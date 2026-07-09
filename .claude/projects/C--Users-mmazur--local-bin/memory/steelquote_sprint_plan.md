---
name: steelquote-sprint-plan
description: SteelQuote — push wstrzymany do ~2026-07-17; deploy na AbacusAI wokół tej daty
metadata: 
  node_type: memory
  type: project
  originSessionId: 4943577a-54b8-46e9-81de-de7743c83daa
---

**Plan ustalony 2026-07-08 (user), dwa kamienie milowe:**
- **2026-07-14:** wdrożyć **v2** na AbacusAI z aktualnej wersji GitHub, a POTEM wypchnąć aktualną
  wersję lokalną na GitHub (`git push` niewypchniętych commitów: poprawki + eksport Excel).
- **2026-07-17:** wdrożyć **v3** na AbacusAI oraz zacommitować/wypchnąć **v4** na GitHub.

Do 14.07 zmiany zbieramy lokalnie w commitach na `main`, bez pushowania (repo publiczne —
`github.com/Kotsur69/SteelQuote`). Deploy przez AbacusAI DeepAgent wg jego zasad — patrz
[[steelquote-hosting]].

**Google Calendar: utworzone 2026-07-08.** Oba wydarzenia (1h blok o 09:00, przypomnienie
same-day popup) istnieją w kalendarzu matitrampolin@gmail.com:
- **2026-07-14 09:00** — „AMSteel Quote: deploy v2 + push to GitHub" (id: 2pmm1galtf0lulv0n2froggk14)
- **2026-07-17 09:00** — „AMSteel Quote: deploy v3 + commit v4" (id: nekndm7125l9so1j52o8ermjt0)

Stan na 2026-07-08: na GitHubie jest commit `4dbf702`; lokalnie czekają niewypchnięte commity
(poprawki regresji + eksport do Excela KTS/GPAO). Prompt wdrożeniowy v3 do zrobienia przed pushem
i musi objąć WSZYSTKO (w tym fix typu `serverPdf.ts` — warunek budowalności — oraz zależność `xlsx`).
Szczegóły postępu: `AMSteel_Quote/STAN_PROJEKTU.md`. Zob. [[steelquote-project]].
