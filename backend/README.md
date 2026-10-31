# Backend API — Obra Calc

Peanut contract para o serviço HTTP backend do `obra_calc`.

## Stack
- **Framework**: Lumen 10.x (PHP 8.2)
- **Banco de Dados**: MariaDB / Eloquent ORM
- **Porta Padrão**: `http://localhost:8084`

## Rotas Principais
- `GET /api/ping`: Verificação de integridade do serviço.
- `GET /api/obras`: Listagem de projetos de aviário.
- `POST /api/obras`: Criação de novo projeto.
- `GET|PUT|DELETE /api/obras/{id}`: Detalhe, atualização e exclusão de projeto.
- `POST /api/obras/{id}/calculos`: Registro de cálculo vinculado à obra.
- `GET /api/obras/{id}/calculos`: Listagem de cálculos vinculados.
- `POST /api/calculos/{tipo}`: Endpoint de cálculo server-side.
- `GET /api/normativas`: Normativas técnicas ativas.

## Modelos
- `ProjetoAviario`: Entidade raiz (`projetos_aviario`).
- `Calculo`: Resultados e parâmetros persistidos (`calculos`).
- `NormativaTecnica`: Regras dimensionais e normativas (`normativas_tecnicas`).
