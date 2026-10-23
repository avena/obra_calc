# Arquitetura Completa — Obra Calc

## Visão Geral

Sistema completo de calculadora de obra com frontend React + Vite + TypeScript e backend Lumen + MariaDB + Docker.

---

## 1. Frontend (React + Vite + TypeScript)

### Stack
- React 18 + Vite 5
- TypeScript strict mode
- Bootstrap 5.3.8 (local em `vendor/`)
- Font Awesome 6.7.2 (local em `vendor/`)
- Jest 29 + ts-jest + jsdom

### Estrutura de Pastas
```
src/
├── main.tsx          # Bootstrap ReactDOM
├── App.tsx           # App principal com navegação por tabs
├── components/
│   ├── Alvenaria.tsx
│   ├── Piso.tsx
│   ├── Argamassa.tsx
│   ├── Concreto.tsx
│   ├── Aco.tsx
│   ├── Galinheiro.tsx
│   ├── AviarioPlantaSVG.tsx
│   ├── ObrasManager.tsx
│   └── ToastNotification.tsx
├── services/
│   └── api.ts        # Comunicação com backend
├── __tests__/        # Testes Jest
├── __mocks__/
│   └── styleMock.js
├── index.css
```

### Configuração Vite
- Plugin React
- Porta dev: 5173
- Build output: dist/

### Testes
- 32 testes passando em 10 suítes
- Ferramenta: Jest 29 + ts-jest + jsdom
- Config: `jest.config.cjs`

---

## 2. Backend (Lumen + PHP + MariaDB)

### Stack
- PHP 8.x + Lumen 10
- MariaDB 10.6
- Docker Compose (3 serviços: app, web, db)
- Adminer (porta 8085)

### Estrutura de Pastas
```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Controller.php
│   │   │   ├── ObrasController.php
│   │   │   ├── CalculosController.php
│   │   │   └── NormativasController.php
│   │   └── Middleware/
│   │       └── CorsMiddleware.php
│   ├── Models/
│   │   ├── ProjetoAviario.php
│   │   ├── NormativaTecnica.php
│   │   └── Calculo.php
│   └── Exceptions/
│       └── Handler.php
├── bootstrap/
│   └── app.php
├── config/
├── database/
│   ├── migrations/
│   └── seeders/
├── routes/
│   └── web.php
├── storage/
│   └── logs/
├── tests/
│   └── Feature/
├── public/
│   ├── index.php
│   ├── adminer.html
│   └── adminer-quick.php
├── .env
├── composer.json
└── phpunit.xml
```

### Migrations
1. `normativas_tecnicas` — perfis normativos (Embrapa, CPT)
2. `projetos_aviario` — obras (com UUID)
3. `calculos` — histórico de cálculos por obra

### Endpoints API
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /api/ping | Health check |
| GET | /api/obras | Listar obras |
| POST | /api/obras | Criar obra |
| GET | /api/obras/{id} | Detalhar obra |
| PUT | /api/obras/{id} | Atualizar obra |
| DELETE | /api/obras/{id} | Deletar obra |
| POST | /api/obras/{id}/calculos | Salvar cálculo |
| GET | /api/obras/{id}/calculos | Listar cálculos |
| POST | /api/calculos/{tipo} | Calcular |
| GET | /api/calculos | Listar tipos |
| GET | /api/normativas | Listar normativas |

### Tipos de Cálculo
- alvenaria
- piso
- argamassa
- concreto
- aco
- galinheiro
- aviario-embrapa

---

## 3. Docker Compose

### Serviços
| Serviço | Imagem | Porta | Descrição |
|---------|--------|-------|-----------|
| app | PHP 8.5.5 FPM | 9000 (interno) | PHP-FPM com Lumen |
| web | Apache 2.4 | 8084 | Proxy reverso para app |
| db | MariaDB 10.6 | 3306 | Banco de dados |
| adminer | Adminer | 8085 | Interface web DB |

### Dockerfile
- Base: php:8.5.5-fpm
- Extensões: pdo_mysql, mbstring, openssl, bcmath, gd, intl, zip, xml
- Composer instalado

### Volumes
- `.:/var/www/html:cached` — código do projeto
- `obra_calc_db_data:/var/lib/mysql` — dados do banco

### Credenciais (.env)
```
MYSQL_ROOT_PASSWORD=rootsecret
MYSQL_DATABASE=obra_calc
MYSQL_USER=lumens
MYSQL_PASSWORD=secret
```

---

## 4. Justfile (Comandos)

### Frontend
| Comando | Descrição |
|---------|-----------|
| `just devup` | Sobe Vite dev (5173) |
| `just devdown` | Para servidor dev |
| `just build` | Build de produção |
| `just preview` | Preview build (4173) |
| `just serve` | Serve build (8080) |
| `just test` | Roda testes Jest |

### Backend
| Comando | Descrição |
|---------|-----------|
| `just lumen-up` | Sobe containers Docker |
| `just lumen-down` | Para containers Docker |
| `just lumen-restart` | Reinicia containers |
| `just lumen-migrate` | Roda migrations |
| `just lumen-seed` | Roda seeders |
| `just lumen-test` | Roda testes PHPUnit |
| `just lumen-shell` | Shell do container PHP |
| `just lumen-db` | CLI MariaDB |
| `just lumen-ps` | Status containers |
| `just lumen-logs-app` | Logs do app |
| `just lumen-logs-db` | Logs do DB |

### Gerais
| Comando | Descrição |
|---------|-----------|
| `just up` | Sobe backend + frontend |
| `just down` | Para tudo |
| `just restart` | Reinicia tudo |
| `just infra` | Exibe info da infraestrutura |
| `just logs` | Lista logs do dia |
| `just log-tail` | Acompanha logs em tempo real |
| `just ts-check` | Typecheck TypeScript |
| `just lint` | Lint do código |

---

## 5. Sistema de Logs

### Estrutura
```
logs/
├── YYYY-MM-DD/
│   ├── app.log           # Log principal
│   ├── frontend-*.log    # Logs do frontend
│   ├── docker-*.log      # Logs do Docker
│   └── backend-*.log     # Logs do backend
```

### Formato
```
[YYYY-MM-DD HH:MM:SS] [componente] mensagem
```

---

## 6. Integração Frontend ↔ Backend

### Serviço API (`src/services/api.ts`)
- `ping()` — Health check
- `calcular(tipo, dados)` — Calcular
- `listarObras()` — Listar obras
- `criarObra(dados)` — Criar obra
- `salvarCalculoNaObra(id, tipo, params, resultado)` — Salvar cálculo
- `listarNormativas()` — Listar normativas

### Componente ObrasManager
- CRUD completo de obras
- Edição e deleção
- Toast notifications (Bootstrap)
- Integração com API

### Status da API
- Indicador no header do App
- Online/Offline/Verificando

---

## 7. Adminer (Banco de Dados)

- URL: http://localhost:8085
- Auto-login: http://localhost:8084/adminer-quick.php?server=db&username=lumens&db=obra_calc
- Credenciais: lumens / secret

---

## 8. Git Workflow

### Branches
- `main` — Produção
- `feat/obra-calc-react-integration` — Branch de integração frontend
- `feat/obra-calc-backend-integration` — Branch de integração backend
- `feat/ticket-XX-*` — Branches de features

### Commits
- Conventional commits
- Merge --no-ff para integração

---

## 9. Como Usar em Outro Projeto

### 1. Copiar estrutura Docker
```bash
cp -r docker/ docker-compose.yml justfile .env.example novo-projeto/
```

### 2. Adaptar .env
```env
APP_NAME="Meu Projeto"
DB_DATABASE=meu_projeto
MYSQL_DATABASE=meu_projeto
```

### 3. Iniciar
```bash
cp .env.example .env
just lumen-up
just lumen-migrate
just lumen-seed
```

### 4. Frontend
```bash
npm install
just devup
```

### 5. Acessar
- Frontend: http://localhost:5173
- Backend: http://localhost:8084
- Adminer: http://localhost:8085
- API Ping: http://localhost:8084/api/ping

---

## 10. Referências

- `primeiro-prompt.txt` — Fórmulas e macetes de obra
- `chat.md` — Regras Embrapa Meio-Norte para aviários
- `GLOSSARY.md` — Vocabulário do domínio
- `docs/arquitetura/ARQUITETURA-BACKEND.md` — Arquitetura backend detalhada
- `.scratch/` — Tickets e spec do implement-spec flow
