# Regras de Negócio — Galinheiro

## Entidades

- **Galinheiro**: id, nome, comprimento (m), largura (m), galinhas_por_m2, created_at, updated_at
- **Zona**: tipo (postura/pernoite/pasto), area_m2, percentual
- **Insumo**: tipo (madeira/tijolo), quantidade, unidade

## Regras

1. A soma dos percentuais das zonas deve ser 100% (postura 30% + pernoite 40% + pasto 30%).
2. O número total de galinhas é arredondado para baixo (floor).
3. A madeira é calculada pelo perímetro: `2 × (c + l)`.
4. O tijolo usa altura padrão de 2,0 m se não informada.

## Exemplos

| Comprimento | Largura | Galinhas/m² | Área Total | Total Galinhas | Madeira (m) |
|-------------|---------|-------------|------------|----------------|-------------|
| 5 m | 4 m | 3 | 20 m² | 60 | 18 m |
| 10 m | 10 m | 4 | 100 m² | 400 | 40 m |
| 3 m | 2 m | 5 | 6 m² | 30 | 10 m |
