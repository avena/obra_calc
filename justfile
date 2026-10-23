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

# Limpa artefatos de build
clean:
    rm -rf dist node_modules coverage .vite