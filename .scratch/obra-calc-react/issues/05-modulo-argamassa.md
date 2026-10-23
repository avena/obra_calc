Type: feature
Status: open
Blocked by: 01

# Ticket 05 — Módulo Argamassa

## Objetivo
Implementar o cálculo de volume de argamassa/reboco e conversão em latas de 18L.

## Critérios de aceitação
- Componente `Argamassa.tsx` com inputs: área da parede (m²), espessura (cm)
- Fórmula: volume = área × (espessura/100) → m³
- Conversão: 1 m³ ≈ 56 latas de 18L
- Exibição do resultado em alert de sucesso
- Teste unitário passando

## Fórmulas (primeiro-prompt.txt)
- Volume = Área × Espessura
- 1 m³ = 56 latas de 18L
