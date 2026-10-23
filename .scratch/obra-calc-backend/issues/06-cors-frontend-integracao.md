Type: integration
Status: open
Blocked by: 04, 05

# Ticket 06 — CORS e Integração Frontend

## Objetivo
Configurar CORS no Lumen para o frontend React consumir a API em desenvolvimento local.

## Critérios de aceitação
- CORS configurado para permitir requisições do frontend (ex: http://localhost:5173)
- Headers Access-Control-Allow-Origin, Methods, Headers configurados
- Frontend React consegue chamar `POST /api/calculos/{tipo}` e receber resposta
- Frontend consegue salvar cálculo vinculado a uma obra via `POST /api/obras/{id}/calculos`
- Requisições OPTIONS (preflight) respondem corretamente

## Notas
Usar middleware CORS do Lumen ou pacote barryvdh/laravel-cors adaptado
