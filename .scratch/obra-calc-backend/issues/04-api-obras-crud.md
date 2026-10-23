Type: feature
Status: open
Blocked by: 03

# Ticket 04 — API CRUD de Obras

## Objetivo
Implementar os endpoints RESTful para CRUD completo de obras (projetos).

## Critérios de aceitação
- `GET /api/obras` — listar todas as obras
- `POST /api/obras` — criar nova obra
- `GET /api/obras/{id}` — detalhar uma obra específica
- `PUT /api/obras/{id}` — atualizar uma obra
- `DELETE /api/obras/{id}` — deletar uma obra
- Respostas em JSON consistentes
- Validação de campos obrigatórios (nome_obra, qtd_aves, comprimento_m, largura_m)
- Foreign key normativa_id respeitada

## Notas
Usar Lumen Resource ou arrays associativos para serialização JSON
