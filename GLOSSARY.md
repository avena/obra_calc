# GLOSSARY — obra_calc

Vocabulário do domínio do projeto **obra_calc** (calculadora de obras de construção civil).

## Conceitos

- **Obra**: projeto de construção civil em que se calculam materiais e custos.
- **Alvenaria**: etapa de construção que fixa os blocos nas fundações/perfilados. Inclui o desconto de portas e janelas da área total.
- **Bloco**: unidade modular de alvenaria (ex.: 9x19x19, 9x19x29, 9x19x39). Rendimento em unidades por metro quadrado.
- **Rendimento de bloco**: unidades/m² por dimensão do bloco. Ex.: bloco 9x19x19 = 25 un/m².
- **Perdas**: desconto padrão de 5% na compra de blocos; variações em piso (5–15%) e argamassa.
- **Argamassa / Reboco**: massa aplicada sobre áreas; volume = área × espessura; rendimento em m² por m³ de massa conforme a espessura.
- **Piso / Porcelanato**: quantidade = área do ambiente ÷ área da peça, com perda (paginação).
- **Contrapiso**: camada de concreto sob o piso; volume = área × espessura + 10% de folga.
- **Laje**: superfície de concreto; volume de concreto = base × altura × comprimento; m³ de concreto por m² conforme a espessura.
- **Concreto**: m³ de concreto com rendimentos por espessura de laje e peso próprio (~25 kN/m³).
- **Aço**: peso linear ≈ diâmetro²/162; quantidade de barras N = (comprimento ÷ espaçamento) + 1.
- **Cálculo de obra**: processo iterativo de estimar quantidades de materiais antes da execução.

## Ficou em aberto

- (Reservar para `/domain-modeling` — quando os conceitos acima forem refinados ou surgirem novas decisões).
