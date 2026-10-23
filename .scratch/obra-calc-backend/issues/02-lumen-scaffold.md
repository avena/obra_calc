Type: setup
Status: open
Blocked by: 01

# Ticket 02 — Lumen Scaffold

## Objetivo
Instalar o Lumen (micro-framework Laravel) e configurar a estrutura inicial do backend.

## Critérios de aceitação
- Lumen instalado via Composer na raiz do projeto (ou em subpasta `backend/`)
- `public/` como docroot (compatível com DreamHost)
- `.env` e `vendor/` fora do docroot
- Estrutura Lumen padrão: `app/`, `config/`, `database/`, `routes/`, `bootstrap/`
- `php artisan` funcionando dentro do container PHP-FPM
- Rota de teste `GET /api/ping` retornando JSON `{"status": "ok"}`

## Notas
Usar `composer create-project laravel/lumen` ou instalar lumen/lumen-lumen
