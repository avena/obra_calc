# Map — Obra Calc Backend (Lumen + MariaDB + Docker)

## Notes
Backend Lumen + MariaDB + Docker Compose espelhando DreamHost, com API REST para salvar obras e cálculos. Baseado no spec em `.scratch/obra-calc-backend/spec.md` e nas regras do `chat.md` (Embrapa Meio-Norte, CPT Orgânico).

## Decisions-so-far
- PHP 8.x + Lumen + MariaDB + Docker Compose (PHP-FPM + Apache/Nginx proxy + MariaDB)
- Estrutura DreamHost: public/ como docroot, .env e vendor/ fora do docroot
- Tabelas: normativas_tecnicas, projetos_aviario
- Endpoints: POST /api/calculos/{tipo}, CRUD /api/obras, CRUD cálculos
- Frontend React/Vite já implementado (main branch)

## Fog
- Quantas tabelas de parâmetros de insumos são necessárias além de normativas_tecnicas?
- O frontend já tem端点 de consumo definido ou precisa de ajustes?
- Qual porta o MariaDB usará em dev (3306 padrão)?

## Child tickets (sub-issues)
- 01-docker-compose-lumen-mariadb.md — bloqueado por: nenhum
- 02-lumen-scaffold.md — bloqueado por: 01
- 03-migrations-seeders.md — bloqueado por: 02
- 04-api-obras-crud.md — bloqueado por: 03
- 05-api-calculos-tipos.md — bloqueado por: 03
- 06-cors-frontend-integracao.md — bloqueado por: 04, 05
- 07-testes-e-code-review.md — bloqueado por: 06

Status do map: open
