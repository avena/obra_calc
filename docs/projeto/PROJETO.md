# Obra Calc — Documentação do Projeto

## Visão Geral

O **Obra Calc** é uma calculadora interativa de materiais para construção civil, desenvolvida como uma aplicação React + Vite + TypeScript com interface responsiva (Bootstrap 5.3.8 + Font Awesome 6.7.2 hospedados localmente em `vendor/`).

O aplicativo permite calcular quantidades de insumos para diferentes etapas de uma obra:
- **Alvenaria**: blocos com desconto de portas/janelas + 5% de perda
- **Piso**: quantidade de peças com perda configurável (5/10/15%)
- **Argamassa**: volume em m³ e conversão em latas de 18L
- **Concreto**: volume (m³) com referência de peso próprio (~25 kN/m³)
- **Aço**: peso linear (d²/162) e quantidade de barras para laje
- **Galinheiro** (módulo adicional): área total, zonas (postura/pernoite/pasto), número de galinhas, madeira e tijolos

---

## Estrutura do Repositório

```
obra_calc/
├── AGENTS.md                  # Configuração de agent skills (issue tracker, triage, domain docs)
├── GLOSSARY.md                # Vocabulário do domínio (obra, alvenaria, bloco, argamassa, concreto, aço)
├── justfile                   # Comandos de desenvolvimento (devup, devdown, build, repomap, jsmap, etc.)
├── package.json               # Dependências: React 18, Vite, Bootstrap, Jest, ts-jest, TypeScript
├── vite.config.ts             # Configuração Vite com plugin React
├── tsconfig.json              # TypeScript strict mode
├── tsconfig.node.json         # TypeScript para node (vite config)
├── index.html                 # Entry point com links para vendor CSS local
├── jest.config.cjs            # Configuração Jest (jsdom, ts-jest, style mock)
├── src/
│   ├── main.tsx               # Bootstrap do ReactDOM
│   ├── index.css              # Estilos base
│   ├── App.tsx                # App principal com navegação por tabs
│   ├── components/
│   │   ├── Alvenaria.tsx      # Cálculo de blocos de alvenaria
│   │   ├── Piso.tsx           # Cálculo de peças de piso
│   │   ├── Argamassa.tsx      # Cálculo de volume de argamassa
│   │   ├── Concreto.tsx       # Cálculo de volume de concreto
│   │   ├── Aco.tsx            # Cálculo de peso do aço
│   │   └── Galinheiro.tsx     # Cálculo de área e insumos para galinheiro
│   ├── __tests__/
│   │   ├── setup.test.ts
│   │   ├── app-smoke.test.tsx
│   │   ├── app-tabs.integ.test.tsx
│   │   ├── Alvenaria.test.tsx
│   │   ├── Piso.test.tsx
│   │   ├── Argamassa.test.tsx
│   │   ├── Concreto.test.tsx
│   │   ├── Aco.test.tsx
│   │   └── galinheiro.test.tsx
│   └── __mocks__/
│       └── styleMock.js       # Mock de CSS para Jest
├── public/
│   ├── vendor/
│   │   ├── bootstrap.min.css
│   │   ├── bootstrap.bundle.min.js
│   │   └── fontawesome/
│   │       └── fontawesome-free-6.7.2-web/
│   └── vite.svg
├── vendor/                    # Cópias locais das dependências frontend
│   ├── bootstrap.min.css
│   ├── bootstrap.bundle.min.js
│   └── fontawesome/
│       └── fontawesome-free-6.7.2-web/
├── docs/
│   ├── agents/
│   │   ├── issue-tracker.md   # GitHub Issues (primary) + .scratch/ (fallback)
│   │   ├── triage-labels.md   # Labels: needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix
│   │   └── domain.md          # Regras de consumo de documentação de domínio
│   ├── adr/                   # Arquitetura decisions records (vazio, pronto para uso)
│   ├── galinheiro/
│   │   ├── README.md          # Documentação do módulo Galinheiro
│   │   └── regras-negocio.md  # Regras de negócio do galinheiro
│   ├── projeto/               # (este documento)
│   ├── arquitetura/           # Documentação de arquitetura
│   └── fluxo/                 # Documentação de fluxo de trabalho
├── .scratch/
│   └── obra-calc-react/
│       ├── map.md             # Map de todos os tickets
│       └── issues/
│           ├── 01-setup-vite-react-ts.md
│           ├── 02-vendor-bootstrap-fontawesome.md
│           ├── 03-modulo-alvenaria.md
│           ├── 04-modulo-piso.md
│           ├── 05-modulo-argamassa.md
│           ├── 06-modulo-concreto.md
│           ├── 07-modulo-aco.md
│           ├── 08-integracao-app-com-tabs.md
│           └── 09-testes-e-code-review.md
└── .gitignore                 # node_modules, dist, .env, etc.
```

---

## Fluxo de Desenvolvimento (`implement-spec`)

O projeto foi implementado seguindo o fluxo `implement-spec` das Matt Pocock Skills:

### Etapas executadas

1. **Spec**: Sintetizada a partir do `primeiro-prompt.txt` (fórmulas de cálculo de obra)
2. **Tickets**: 9 tickets criados em `.scratch/obra-calc-react/issues/` com relações de bloqueio
3. **Branch de integração**: `feat/obra-calc-react-integration`
4. **Implementers subagentes**: 7 implementers em paralelo para tickets 01–07, cada um em worktree dedicado com TDD
5. **Merger subagentes**: Merge de cada ticket na branch de integração
6. **Ticket 08**: Integração do App com tabs (dependente de 03–07)
7. **Ticket 09**: Testes e code review (pendente — aguardando execução do code-review skill)
8. **Módulo Galinheiro**: Adicionado como funcionalidade extra com TDD e documentação

### Grafo de tickets (bloqueios)

```
01 (setup) ──┬──→ 02 (vendor)
             ├─→ 03 (alvenaria)
             ├─→ 04 (piso)
             ├─→ 05 (argamassa)
             ├─→ 06 (concreto)
             └─→ 07 (aço)
02, 03, 04, 05, 06, 07 ──→ 08 (integração tabs)
08 ──→ 09 (testes + code review)
```

### Issues no GitHub

Todas as 9 issues foram publicadas no GitHub (`avena/obra_calc/issues`):
- #1: Ticket 02 — Vendor Bootstrap + Font Awesome
- #2: Ticket 01 — Setup Vite + React + TypeScript
- #3: Ticket 03 — Módulo Alvenaria
- #4: Ticket 04 — Módulo Piso
- #5: Ticket 05 — Módulo Argamassa
- #6: Ticket 06 — Módulo Concreto
- #7: Ticket 07 — Módulo Aço
- #8: Ticket 08 — Integração do App com Tabs
- #9: Ticket 09 — Testes e Code Review

Labels aplicadas: `ready-for-agent`, `needs-triage`

---

## Módulo Galinheiro (adicional)

### Objetivo
Calcular área, zonas funcionais, número de galinhas e insumos (madeira, tijolo) para construção de galinheiros.

### Fórmulas
| Insumo | Fórmula |
|--------|---------|
| Área total | `comprimento × largura` |
| Área postura | `área total × 0,30` (30%) |
| Área pernoite | `área total × 0,40` (40%) |
| Área pasto | `área total × 0,30` (30%) |
| Total galinhas | `floor(área total × galinhas por m²)` |
| Madeira (m) | `2 × (comprimento + largura)` |
| Tijolo (un) | `ceil(2 × (c + l) × altura / 0,01)` |

### Arquivos
- `src/components/Galinheiro.tsx` — Componente React
- `src/__tests__/galinheiro.test.tsx` — 9 testes Jest (todos passando)
- `docs/galinheiro/README.md` — Documentação do módulo
- `docs/galinheiro/regras-negocio.md` — Regras de negócio

---

## Justfile — Comandos Disponíveis

```bash
# Desenvolvimento
just devup          # Sobe Vite dev server (porta 5173)
just devdown        # Deruba servidor de dev
just restart        # Reinicia ambiente de dev
just serve          # Serve build de produção (porta 8080)
just serve-down     # Deruba servidor de produção

# Qualidade de código
just install        # npm install
just ts-check       # npx tsc --noEmit
just lint           # npx eslint src
just build          # npm run build (Vite)
just preview        # npm run preview
just test           # npm test (Jest)
just pre-commit     # npx lint-staged

# Contexto para IA (estilo calculos-agronomicos)
just repomap        # Contexto global do repositório via Repomix
just jsmap          # Contexto JS/HTML/CSS/Tests
just tsmap          # Contexto TypeScript/Types
just commit-context # Contexto de commit (git status + Repomix)
just clean-ai       # Remove arquivos de contexto temporários
just clean          # Limpa tudo (build + IA context)
```

---

## Testes

- **Total**: 23 testes passando em 9 suítes
- **Suítes**: setup, app-smoke, Piso, Concreto, Argamassa, Alvenaria, app-tabs.integ, galinheiro, Aco
- **Ferramenta**: Jest 29 + ts-jest + jsdom + @testing-library/react + @testing-library/jest-dom
- **Config**: `jest.config.cjs` com `testEnvironment: jsdom`, `setupFiles` com polyfill TextEncoder

---

## Próximos Passos (Backend)

O backend Lumen + MariaDB + Docker (espelhando DreamHost) ainda não foi implementado. O fluxo recomendado:

1. **`@grill-with-docs`**: Sharpen a ideia do backend (Lumen API, MariaDB, Docker Compose, compatibilidade DreamHost)
2. **`@to-spec`**: Produzir spec formal
3. **`@to-tickets`**: Quebrar em tickets com bloqueios
4. **`@implement-spec`**: Implementar com subagentes + TDD
5. **`@code-review`**: Revisão antes do push

Referências de arquitetura e regras de negócio:
- **`chat.md`** (origem: Gemini Chat, 23/Out/2026) — 6 turnos com decisões de arquitetura (bancos de dados para IA, backend Python vs PHP, Lumen, Docker DreamHost, regras do Embrapa Meio-Norte para aviários, modelo de dados JSON, componente React SVG para planta baixa 7×4m). Documentado em `docs/arquitetura/ARQUITETURA-BACKEND.md`.
- **`docs/arquitetura/ARQUITETURA-BACKEND.md`** — Resumo de toda a arquitetura discutida no chat.md.
- **`docs/galinheiro/`** — Documentação do módulo Galinheiro com imagens de referência (`assets/icon-app.png`, `assets/galinheiro-referencia.png`) e regras de negócio.
- Referência local para DreamHost: `~/dreamhost` (PHP 8.5.5 FPM + Apache + `php-dreamhost.ini` com 112 diretivas, sem MySQL — usa SQLite).

---

## Estado Atual

- ✅ Frontend React + Vite + TypeScript completo
- ✅ 6 módulos de cálculo implementados e testados
- ✅ Build e typecheck passando
- ✅ 23 testes passando
- ✅ Issues publicadas no GitHub (#1–#9)
- ✅ justfile configurado
- ✅ Documentação em `docs/`
- ⏳ Backend Lumen + MariaDB + Docker (pendente)
- ⏳ Ticket 09 — Code review (pendente execução do skill)