# Justfile — Obra Calc
# https://github.com/casey/just

set dotenv-load

# Default: lista comandos disponíveis
default:
    @just --list

# --- Instalação e qualidade de código ---

# Instala dependências
install:
    npm install

# Typecheck estrito (TypeScript)
ts-check:
    npx tsc --noEmit

# Lint do código-fonte
lint:
    npx eslint src

# Build de produção (Vite)
build:
    npm run build

# Preview da build de produção (serve estático na porta 4173)
preview:
    npm run preview

# --- Ambiente de desenvolvimento ---

# Sobe o servidor de dev do Vite (porta 5173)
devup:
    npm run dev

# Deruba o servidor de dev (porta 5173)
devdown:
    fuser -k 5173/tcp 2>/dev/null || true
    @echo "✅ dev servers stopped"

alias down := devdown

# Reinicia o ambiente de dev (desliga e sobe limpo)
restart: devdown devup

# Serve a build de produção localmente (porta 8080)
serve:
    @if [ ! -d dist ]; then \
        echo "❌ dist/ não encontrado. Rode: just build"; \
        exit 1; \
    fi
    npx serve dist -p 8080

# Deruba o servidor de produção local (porta 8080)
serve-down:
    fuser -k 8080/tcp 2>/dev/null || true
    @echo "✅ serve stopped"

alias serve-stop := serve-down

# --- Atalhos úteis ---

# Roda testes (se existirem)
test:
    npm test

# Roda pré-commit (lint-staged)
pre-commit:
    npx lint-staged

# --- Contexto para IA (estilo calculos-agronomicos) ---

# Gera contexto global do repositório via Repomix
repomap:
    @mkdir -p .ai/.ai-context
    @DATE=$$(date +%Y-%m-%d) && \
    echo "==> 1. Mapeando Repositório (Global)..." && \
    npx repomix --output ".ai/.ai-context/repo-map-$${DATE}.md" && \
    echo "==> Concluído: .ai/.ai-context/repo-map-$${DATE}.md"

# Gera contexto JS/HTML/CSS/Tests para análise de código
jsmap:
    @mkdir -p .ai/.ai-context
    @DATE=$$(date +%Y-%m-%d) && \
    echo "==> Gerando contexto JS/HTML/CSS/Tests..." && \
    npx repomix --config repomix.config.jsanalysis.json \
        --output ".ai/.ai-context/js-analysis-$${DATE}.md" 2>/dev/null || \
    npx repomix --include "src/**/*.{ts,tsx,js,jsx},index.html,public/**/*.{css,js},*.config.{ts,js},*.config.cjs,package.json" \
        --output ".ai/.ai-context/js-analysis-$${DATE}.md" && \
    echo "==> Pronto: .ai/.ai-context/js-analysis-$${DATE}.md"

# Gera contexto TypeScript/Types/Tests para análise de migração/tipos
tsmap:
    @mkdir -p .ai/.ai-context
    @DATE=$$(date +%Y-%m-%d) && \
    echo "==> Gerando contexto TS/Types/Parity Tests..." && \
    npx repomix --include "ts/**/*.ts,ts/**/*.d.ts,tsconfig*.json,src/**/*.{ts,tsx},vite.config.ts,package.json" \
        --output ".ai/.ai-context/ts-analysis-$${DATE}.md" && \
    echo "==> Pronto: .ai/.ai-context/ts-analysis-$${DATE}.md"

# Gera contexto de commit (git status + arquivos alterados via Repomix)
commit-context:
    @mkdir -p .ai/.ai-context
    @DATE=$$(date +%Y-%m-%d) && \
    echo "==> Gerando contexto de commit..." && \
    git status --short > ".ai/.ai-context/git-status-$${DATE}.txt" && \
    npx repomix --include "src/**" --output ".ai/.ai-context/commit-context-$${DATE}.md" && \
    echo "==> Pronto: .ai/.ai-context/commit-context-$${DATE}.md"

# Remove arquivos de contexto temporários de IA
clean-ai:
    rm -f .ai/.ai-context/*.md .ai/.ai-context/*.txt

# --- Backend Lumen (Docker + MariaDB) ---

# Sobe o ambiente Docker do backend (PHP-FPM + Apache/Nginx + MariaDB)
lumen-up:
    @if [ ! -f .env ]; then \
        echo "❌ .env não encontrado. Copie .env.example para .env e configure as credenciais."; \
        exit 1; \
    fi
    docker compose -f docker-compose.yml up -d
    @echo "✅ Backend Lumen subido. Acesse: http://localhost:8084"

# Deruba o ambiente Docker do backend
lumen-down:
    docker compose -f docker-compose.yml down
    @echo "✅ Backend Lumen parado"

alias lumen-stop := lumen-down

# Reinicia o ambiente Docker do backend
lumen-restart: lumen-down lumen-up

# Executa comando dentro do container PHP (ex: just lumen-php artisan migrate)
lumen-php *ARGS:
    docker compose -f docker-compose.yml exec app php {{ARGS}}

# Executa migrations do Lumen
lumen-migrate:
    docker compose -f docker-compose.yml exec app php artisan migrate

# Executa seeders do Lumen
lumen-seed:
    docker compose -f docker-compose.yml exec app php artisan db:seed

# Executa testes PHPUnit do Lumen
lumen-test:
    docker compose -f docker-compose.yml exec app php artisan test

# Acessa shell do container PHP
lumen-shell:
    docker compose -f docker-compose.yml exec app sh

# Acessa CLI do MariaDB
lumen-db:
    docker compose -f docker-compose.yml exec db mysql -u root -p$$MYSQL_ROOT_PASSWORD

# Verifica status dos containers
lumen-ps:
    docker compose -f docker-compose.yml ps

# Ver logs do container PHP
lumen-logs-app:
    docker compose -f docker-compose.yml logs -f app

# Ver logs do container MariaDB
lumen-logs-db:
    docker compose -f docker-compose.yml logs -f db

# --- Limpeza geral ---

# Limpa artefatos de build
clean: clean-ai
    rm -rf dist node_modules coverage .vite