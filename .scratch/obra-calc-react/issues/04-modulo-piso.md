Type: feature
Status: open
Blocked by: 01

# Ticket 04 — Módulo Piso

## Objetivo
Implementar o cálculo de quantidade de peças de piso/porcelanato com perda configurável.

## Critérios de aceitação
- Componente `Piso.tsx` com inputs: área do ambiente, largura peça (cm), comprimento peça (cm), perda %
- Fórmula: área ambiente ÷ área peça (em m²) → arredondar para cima → × (1 + perda/100) → arredondar para cima
- Opções de perda: 5% (reta), 10% (reta), 15% (diagonal/recortes)
- Exibição do resultado em alert de sucesso
- Teste unitário passando

## Fórmulas (primeiro-prompt.txt)
- Quantidade = Área do ambiente ÷ Área da peça
- Perda: +5% a 15%
