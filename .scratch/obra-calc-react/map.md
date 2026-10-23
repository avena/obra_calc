# Map — Obra Calc (React + Vite + TypeScript)

## Notes
Refazer a implementação da Calculadora de Obra seguindo o fluxo implement-spec:
- Branch de integração dedicada
- Tickets com relações de bloqueio
- Implementers com TDD
- Merger subagent
- Code review antes do push

## Decisions-so-far
- Issue tracker: `.scratch/` (local markdown fallback configurado em docs/agents/issue-tracker.md)
- Stack: Vite + React 18 + TypeScript + Bootstrap 5.3.8 (vendor local) + Font Awesome 6.7.2 (vendor local)
- Fórmulas baseadas em primeiro-prompt.txt

## Fog
- Quantos testes por módulo?
- Quais ports usar (dev: 5173, preview: 4173)?

## Child tickets (sub-issues)
- 01-setup-vite-react-ts.md — bloqueado por: nenhum
- 02-vendor-bootstrap-fontawesome.md — bloqueado por: 01
- 03-modulo-alvenaria.md — bloqueado por: 01
- 04-modulo-piso.md — bloqueado por: 01
- 05-modulo-argamassa.md — bloqueado por: 01
- 06-modulo-concreto.md — bloqueado por: 01
- 07-modulo-aco.md — bloqueado por: 01
- 08-integracao-app-com-tabs.md — bloqueado por: 03, 04, 05, 06, 07
- 09-testes-e-code-review.md — bloqueado por: 08

Status do map: open
