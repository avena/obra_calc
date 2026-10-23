Type: feature
Status: open
Blocked by: 01

# Ticket 03 — Módulo Alvenaria

## Objetivo
Implementar o cálculo de blocos de alvenaria com desconto de portas/janelas + 5% de perda.

## Critérios de aceitação
- Componente `Alvenaria.tsx` com inputs: comprimento, altura, área portas, área janelas, tipo de bloco
- Rendimentos: 9x19x19 = 25 un/m², 9x19x29 = 16,7 un/m², 9x19x39 = 12,5 un/m²
- Fórmula: área total − portas − janelas → × rendimento → × 1,05 → arredondar para cima
- Exibição do resultado em alert de sucesso
- Teste unitário passando (vitest ou similar)

## Fórmulas (primeiro-prompt.txt)
- Bloco 9x19x19 = 25 un/m²
- Bloco 9x19x29 = 16,7 un/m²
- Bloco 9x19x39 = 12,5 un/m²
- Perda: +5%
