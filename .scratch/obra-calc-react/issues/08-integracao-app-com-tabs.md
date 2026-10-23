Type: integration
Status: open
Blocked by: 03, 04, 05, 06, 07

# Ticket 08 — Integração do App com Tabs

## Objetivo
Montar o App principal com navegação por tabs (Bootstrap nav-tabs), integrando todos os módulos.

## Critérios de aceitação
- `App.tsx` com estado `activeTab` e renderização condicional dos 5 módulos
- Tabs: Alvenaria, Piso, Argamassa, Concreto, Aço
- Header com título "Calculadora de Obra" e ícone Font Awesome
- Footer com referência ao primeiro-prompt.txt
- Layout responsivo com container Bootstrap
- Build passa sem erros

## Notas
Usar componentes criados nos tickets 03–07.
