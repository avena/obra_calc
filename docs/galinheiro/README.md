# Módulo Galinheiro — Documentação

## Objetivo

Calcular área, zonas funcionais, número de galinhas e insumos (madeira, tijolo) para construção de galinheiros, integrando-se à Calculadora de Obra (`obra_calc`).

## Conceitos de domínio

- **Galinheiro**: estrutura para criação de galinhas, dividida em zonas funcionais.
- **Área total**: comprimento × largura do galinheiro (m²).
- **Zona de postura**: área onde as galinhas põem os ovos (30% da área total).
- **Zona de pernoite**: área onde as galinhas passam a noite (40% da área total).
- **Zona de pasto**: área livre para as galinhas circularem (30% da área total).
- **Galinhas por m²**: densidade de criação, conforme literatura (comumente entre 3 e 5 galinhas/m²).
- **Madeira**: estrutura de suporte/perímetro do galinheiro (m lineares).
- **Tijolo**: alvenaria das paredes (unidades, estimativa).

## Fórmulas

| Insumo | Fórmula |
|--------|---------|
| Área total | `comprimento × largura` |
| Área postura | `área total × 0,30` |
| Área pernoite | `área total × 0,40` |
| Área pasto | `área total × 0,30` |
| Total galinhas | `floor(área total × galinhas por m²)` |
| Madeira (m) | `2 × (comprimento + largura)` |
| Tijolo (un) | `ceil(2 × (c + l) × altura / 0,01)` (altura padrão 2,0 m) |

## Referências

- Literatura de avicultura: densidade de 3 a 5 galinhas por m² em sistemas de cria.
- Fórmulas baseadas no `primeiro-prompt.txt` (regras de cálculo de obra).
- Arquitetura de backend (Lumen + MariaDB + Docker + DreamHost): veja `chat.md` (Turn 1–6) em `docs/arquitetura/ARQUITETURA-BACKEND.md` e as regras de cálculo do Embrapa Meio-Norte (Turn 5–6) com parâmetros normativos para aviários orgânicos/caipiras.

## Imagens de Referência

- `docs/galinheiro/assets/icon-app.png` — Ícone do aplicativo (chat Turn 2).
- `docs/galinheiro/assets/galinheiro-referencia.png` — Foto real de galinheiro de madeira com tela galvanizada e chapa ondulada azul, visão frontal e lateral (chat Turn 3).

## Integração

O módulo é renderizado como uma tab na Calculadora de Obra (`src/components/Galinheiro.tsx`), acessível via navegação Bootstrap `nav-tabs`.

## Testes

Os testes unitários estão em `src/__tests__/galinheiro.test.tsx` (Jest + jsdom + @testing-library/react), cobrindo renderização de inputs, cálculos de área, zonas, galinhas, madeira, tijolo e alerta de sucesso.
