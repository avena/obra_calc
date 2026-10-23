#!/usr/bin/env bash
# tests/docker/lumen-mariadb-validation.sh
#
# Valida os critérios de aceitação do Ticket 01 — Docker Compose Lumen + MariaDB.
# Uso: ./tests/docker/lumen-mariadb-validation.sh   (a partir da raiz do repo)
#
# Critérios verificados:
#   1. docker-compose.yml existe e `docker compose config` é válido
#   2. 3 serviços: app (PHP-FPM), web (proxy), db (MariaDB)
#   3. PHP-FPM expõe as extensões pdo_mysql, mbstring, openssl, bcmath, gd, intl, zip, xml
#   4. Servidor web com DocumentRoot/rewrites para public/ e proxy para app:9000
#   5. MariaDB com credenciais configuráveis via .env (MYSQL_*)
#   6. Porta web publicada (8084) e porta MariaDB publicada (3306)
#   7. Volumes mapeando código do projeto para os containers
#   8. .env.example presente (just lumen-up exige .env)
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"

# Valores padrão para que `docker compose config` não falte por variáveis não definidas
export MYSQL_ROOT_PASSWORD="${MYSQL_ROOT_PASSWORD:-rootsecret}"
export MYSQL_DATABASE="${MYSQL_DATABASE:-obra_calc}"
export MYSQL_USER="${MYSQL_USER:-lumens}"
export MYSQL_PASSWORD="${MYSQL_PASSWORD:-secret}"
export APP_ENV="${APP_ENV:-local}"
export APP_DEBUG="${APP_DEBUG:-true}"

PASS=0
FAIL=0

ok() { echo "  [PASS] $1"; PASS=$((PASS + 1)); }
no() { echo "  [FAIL] $1"; FAIL=$((FAIL + 1)); }

echo "═══════════════════════════════════════════════════════════════"
echo " Ticket 01 — Docker Compose Lumen + MariaDB (validação)"
echo "═══════════════════════════════════════════════════════════════"

COMPOSE="docker-compose.yml"

# ── 1. docker-compose.yml existe ──────────────────────────────
if [ -f "$COMPOSE" ]; then ok "docker-compose.yml existe"; else no "docker-compose.yml ausente na raiz"; fi

# ── 2. docker compose config válido ───────────────────────────
if [ -f "$COMPOSE" ] && docker compose -f "$COMPOSE" config >/dev/null 2>&1; then
    ok "docker compose config é válido"
else
    no "docker compose config inválido"
fi

# ── 3. 3 serviços: app, web, db ───────────────────────────────
if [ -f "$COMPOSE" ]; then
    for svc in app web db; do
        if docker compose -f "$COMPOSE" config --services 2>/dev/null | grep -qx "$svc"; then
            ok "serviço '$svc' declarado no docker-compose.yml"
        else
            no "serviço '$svc' ausente no docker-compose.yml"
        fi
    done
fi

# ── 4. Porta web publicada (8084) e MariaDB publicada (3306) ─
if [ -f "$COMPOSE" ]; then
    CFG="$(docker compose -f "$COMPOSE" config 2>/dev/null || true)"
    if echo "$CFG" | grep -qE 'published: *"?8084"?'; then
        ok "porta do servidor web publicada (8084)"
    else
        no "porta do servidor web não publicada (esperado 8084)"
    fi
    if echo "$CFG" | grep -qE 'published: *"?3306"?'; then
        ok "porta do MariaDB publicada (3306)"
    else
        no "porta do MariaDB não publicada (esperado 3306)"
    fi
fi

# ── 5. Volumes mapeando código do projeto ─────────────────────
if [ -f "$COMPOSE" ]; then
    if docker compose -f "$COMPOSE" config 2>/dev/null | grep -qE '/var/www/html|\.\./|\.'; then
        ok "volumes mapeando código do projeto para os containers"
    else
        no "volumes não mapeiam o código do projeto"
    fi
fi

# ── 6. MariaDB credenciais via .env ───────────────────────────
if [ -f "$COMPOSE" ]; then
    for var in MYSQL_ROOT_PASSWORD MYSQL_DATABASE MYSQL_USER MYSQL_PASSWORD; do
        if docker compose -f "$COMPOSE" config 2>/dev/null | grep -q "MYSQL_${var#MYSQL_}:\|${var}: \${${var}}\|${var}:"; then
            : # será checado abaixo por string direta
        fi
        if docker compose -f "$COMPOSE" config 2>/dev/null | grep -q "${var}"; then
            ok "MariaDB usa a credencial '${var}' (configurável via .env)"
        else
            no "MariaDB não declara a credencial '${var}'"
        fi
    done
fi

# ── 7. PHP-FPM com extensões exigidas ─────────────────────────
if [ -f docker/Dockerfile ]; then
    for ext in pdo_mysql mbstring openssl bcmath gd intl zip xml; do
        if grep -qE "${ext}" docker/Dockerfile; then
            ok "Dockerfile declara instalação da extensão '$ext'"
        else
            no "Dockerfile não declara a extensão '$ext'"
        fi
    done
else
    no "docker/Dockerfile ausente (PHP-FPM)"
    for ext in pdo_mysql mbstring openssl bcmath gd intl zip xml; do
        no "Dockerfile não declara a extensão '$ext'"
    done
fi

# ── 8. Servidor web: rewrites para public/ + proxy app:9000 ───
WEB_CONF=""
if [ -f docker/apache/httpd-fpm.conf ]; then WEB_CONF="docker/apache/httpd-fpm.conf"; fi
if [ -f docker/apache/httpd-lumen.conf ]; then WEB_CONF="docker/apache/httpd-lumen.conf"; fi
if [ -n "$WEB_CONF" ]; then
    if grep -qE 'public' "$WEB_CONF"; then ok "servidor web aponta para o diretório public/"; else no "servidor web não referencia public/"; fi
    if grep -qE 'rewrite|Rewrite' "$WEB_CONF" 2>/dev/null || grep -qiE 'rewrite' "$WEB_CONF"; then ok "servidor web com rewrites configurados"; else no "servidor web sem rewrites"; fi
    if grep -qE 'proxy:fcgi://app:9000|app:9000' "$WEB_CONF"; then ok "servidor web faz proxy FastCGI para app:9000"; else no "servidor web não proxia para app:9000"; fi
else
    no "configuração do servidor web ausente (docker/apache/*)"
fi

# ── 9. .env.example presente (just lumen-up exige .env) ───────
if [ -f .env.example ]; then
    ok ".env.example presente"
    for var in MYSQL_ROOT_PASSWORD MYSQL_DATABASE MYSQL_USER MYSQL_PASSWORD; do
        if grep -qE "^${var}=" .env.example; then ok ".env.example define '${var}'"; else no ".env.example não define '${var}'"; fi
    done
else
    no ".env.example ausente (just lumen-up exige .env)"
fi

echo "──────────────────────────────────────────────────────────────"
echo "Resultado: $PASS passou, $FAIL falhou"
if [ "$FAIL" -eq 0 ]; then
    echo "✅ Todos os critérios de aceitação do Ticket 01 foram atendidos"
    exit 0
else
    echo "❌ Critérios de aceitação não atendidos"
    exit 1
fi
