Type: setup
Status: open
Blocked by:

# Ticket 01 — Docker Compose Lumen + MariaDB

## Objetivo
Criar o `docker-compose.yml` e Dockerfiles para subir o ambiente de desenvolvimento do backend Lumen + MariaDB, espelhando as restrições do DreamHost.

## Critérios de aceitação
- `docker-compose.yml` com 3 serviços: app (PHP-FPM), web (Apache ou Nginx proxy), db (MariaDB)
- PHP-FPM com extensões: pdo_mysql, mbstring, openssl, bcmath, gd, intl, zip, xml
- Servidor web com rewrites configurados para o diretório `public/` do Lumen
- MariaDB com credenciais configuráveis via `.env` (MYSQL_ROOT_PASSWORD, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD)
- Porta do servidor web publicada (ex: 8084), porta do MariaDB publicada (ex: 3306)
- Volumes mapeando o código do projeto para os containers
- `just lumen-up` e `just lumen-down` funcionam

## Notas
Referência: `~/dreamhost` (PHP 8.5.5 FPM + Apache + `php-dreamhost.ini` com 112 diretivas)
