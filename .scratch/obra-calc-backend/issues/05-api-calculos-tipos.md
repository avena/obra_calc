Type: feature
Status: open
Blocked by: 03

# Ticket 05 — API de Cálculos por Tipo

## Objetivo
Implementar o endpoint `POST /api/calculos/{tipo}` para cálculo imediato de quantitativos de materiais.

## Critérios de aceitação
- `POST /api/calculos/alvenaria` — comprimento, altura, área portas, área janelas, tipo de bloco → resultado com quantidade de blocos + 5% perda
- `POST /api/calculos/piso` — área ambiente, largura peça, comprimento peça, perda % → quantidade de peças
- `POST /api/calculos/argamassa` — área parede, espessura → volume m³ + latas de 18L
- `POST /api/calculos/concreto` — comprimento, largura, altura → volume m³
- `POST /api/calculos/aco` — diâmetro, comprimento total, espaçamento, comprimento laje → peso linear, peso total, qtd barras
- `POST /api/calculos/galinheiro` — comprimento, largura, galinhas por m² → área total, zonas, total galinhas, madeira, tijolos
- `POST /api/calculos/aviario-embrapa` — número de aves, template, perfil regional, dimensões → dimensionamento zootécnico + lista de materiais
- Validação estrita de inputs com erros JSON consistentes
- Cálculos baseados nas fórmulas do `primeiro-prompt.txt` e regras do Embrapa Meio-Norte

## Notas
Os tipos de cálculo devem corresponder aos módulos do frontend React
