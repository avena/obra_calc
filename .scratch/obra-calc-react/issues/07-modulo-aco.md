Type: feature
Status: open
Blocked by: 01

# Ticket 07 — Módulo Aço

## Objetivo
Implementar o cálculo de peso linear do aço e quantidade de barras para laje.

## Critérios de aceitação
- Componente `Aco.tsx` com inputs: diâmetro (mm), comprimento total (m), espaçamento (cm), comprimento da laje (m)
- Peso linear: diâmetro² / 162 → kg/m
- Peso total: peso linear × comprimento → kg
- Quantidade de barras: (comprimento laje ÷ espaçamento em m) + 1 → arredondar para cima
- Exibição dos resultados em alert de sucesso
- Teste unitário passando

## Fórmulas (primeiro-prompt.txt)
- Peso (kg/m) ≈ Diâmetro² ÷ 162
- N = (Comprimento ÷ Espaçamento) + 1
