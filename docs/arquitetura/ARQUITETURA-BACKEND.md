# Arquitetura de IA — Banco de Dados, Python e PHP

Este documento resume as discussões e decisões de arquitetura registradas em `chat.md` (origem: Gemini Chat, 23/Out/2026), aplicadas ao projeto **obra_calc**.

---

## 1. Panorama de Bancos de Dados para IA

| Categoria | Principais Ferramentas | Onde Brilham | Pontos de Atenção |
|-----------|------------------------|--------------|-------------------|
| Relacional + Vetorial (Híbrido) | **PostgreSQL + pgvector** (Supabase, Neon) | Padrão da indústria: dados relacionais + vetores no mesmo lugar | Ajuste fino de índices (HNSW/IVFFlat) se passar de milhões de linhas |
| Vetoriais Dedicados (SaaS) | **Pinecone, Qdrant, Milvus, Weaviate** | Busca vetorial pura, latência mínima, busca híbrida | Mais um serviço para pagar e sincronizar |
| Locais / Embedded (Prototipagem) | **ChromaDB, LanceDB, FAISS** | Rodam dentro do processo Python, sem infra de rede | Limitados à memória/disco local |
| Relacional Tradicional | **MySQL / MariaDB** | Excelente para CRUD, dados transacionais, infra existente barata | Não tem busca vetorial nativa otimizada para produção |

### Por que o Supabase ficou popular em projetos de IA
- PostgreSQL gerenciado com camada pronta de APIs, autenticação, storage e **pgvector nativo** em um clique.
- Resolve banco transacional + banco vetorial no mesmo lugar.
- Free tier generoso para prototipar.

---

## 2. Avaliação da Arquitetura: React + Micro Framework + Banco

A arquitetura **React (frontend) + Micro Framework (backend API) + Banco de Dados** é a mais recomendada para desacoplamento e manutenibilidade.

### Cenário 1: Backend em Python (FastAPI / LiteStar) — Mais recomendado para IA
- Se a aplicação vai gerar embeddings, orquestrar prompts, rodar pipelines RAG, lidar com streaming de tokens (OpenAI/Anthropic/Gemini) ou integrar LangChain/LlamaIndex/LiteLLM, o ecossistema Python está anos-luz à frente.
- **FastAPI** é o padrão definitivo para APIs assíncronas em Python (tipado, rápido, validação com Pydantic, streaming SSE para chat em tempo real).
- **Limitação em servidor compartilhado:** Rodar processos persistentes (uvicorn/gunicorn) em servidores compartilhados básicos costuma ser restritivo ou bloqueado.

### Cenário 2: Backend em PHP (Slim / Lumen / Laravel enxuto)
- Se há um servidor compartilhado típico (cPanel/Apache/PHP+MySQL), o PHP roda sem configuração complexa de ambiente, daemons ou proxies reversos.
- **Slim Framework 4** ou **Lumen** funcionam bem para consumir APIs de IA externas via HTTP (cURL/Guzzle).
- **Limitação:** Se precisar rodar modelos locais, manipular tensores ou bibliotecas avançadas de RAG/embeddings locais, o PHP depende 100% de serviços externos via REST.

### Recomendações práticas

| Cenário | Recomendação |
|---------|-------------|
| Chamar APIs de LLM externas (OpenAI, Gemini, Anthropic) e salvar mensagens/histórico | **MySQL/MariaDB atual atende perfeitamente**. Usar PHP (Slim/Laravel API) no servidor compartilhado atual sem custos adicionais. |
| RAG (ler PDFs, vetorizar, buscar semanticamente) | MySQL tradicional vai engargalar. Vale criar conta no **Supabase** (plano gratuito, pgvector) ou usar **ChromaDB local** se backend for Python. |
| Backend em Python | Servidores compartilhados comuns não são amigáveis para processos persistentes. Plataformas como Render, Railway ou Fly.io para a API Python (front estático em Vercel/Cloudflare Pages) oferecem experiência mais fluida. |

---

## 3. Decisão para o Projeto Obra Calc

Com base na infraestrutura disponível (servidor compartilhado DreamHost com PHP + MySQL/MariaDB):

- **Backend:** **PHP com micro-framework Lumen** (versão enxuta do Laravel)
- **Banco de Dados:** **MySQL / MariaDB** (infraestrutura existente)
- **Frontend:** **React + Vite + TypeScript** (já implementado)
- **Ambiente de Desenvolvimento:** **Docker Compose** local espelhando as restrições do DreamHost
- **Comunicação:** Frontend consome endpoints REST da API Lumen via Fetch/Axios

---

## 4. Referência: Ambiente DreamHost

O diretório `~/dreamhost` contém um replicador de ambiente DreamHost Shared Unlimited:

- **PHP 8.5.5 FPM puro** (52 extensões DreamHost)
- **Apache httpd 2.4-alpine** como proxy reverso FastCGI → app:9000
- **Porta 8084** para acesso web
- **php-dreamhost.ini** com 112 diretivas curadas (memória, upload, execução, erros, mbstring, MySQLi, OPcache, etc.)
- **Sem MySQL** (usa SQLite file + cache file)
- **entrypoint.sh** com setup automático: composer install, APP_KEY, permissões, database.sqlite, cache de config
- **run.sh** para subir a stack e informar IP WSL + porta

Este será usado como referência para o Docker Compose do projeto obra_calc (com MySQL/MariaDB adicionado).

---

## 5. Prompt Consolidado para o Agente (Backend Lumen)

O arquivo `chat.md` contém um prompt estruturado (Turn 2, linhas 77-126) que pode ser passado diretamente para o agente implementar o backend. Os principais pontos:

1. **Contexto e Objetivo:** Transformar protótipos locais em aplicação estruturada com backend Lumen, banco MySQL/MariaDB, Docker Compose espelhando DreamHost, frontend React/TypeScript consumindo a API.

2. **Etapa Inicial (Reconhecimento):**
   - Explorar o repositório (GLOSSARY.md, primeiro-prompt.txt, documentações de deploy/DreamHost, tickets/planejamento)
   - Mapear regras de negócio: extrair fórmulas matemáticas (alvenaria, argamassa, piso, concreto, aço), perdas e rendimentos
   - Entender entidades centrais: Obra, Etapa/Módulo de Cálculo, Parâmetros e Resultados
   - Validar tickets existentes

3. **Requisitos de Arquitetura:**
   - **Infraestrutura Docker:** docker-compose.yml com PHP-FPM (pdo_mysql, mbstring, openssl), Nginx/Apache com rewrites para public/ do Lumen, MySQL/MariaDB com credenciais via .env
   - **Compatibilidade DreamHost:** pasta pública como docroot, .env e vendor fora do docroot
   - **Backend Lumen:** Controllers, Services/Domain para fórmulas de cálculo, Repositories/Models; Migrations e Seeders para obras, parâmetros de insumos, histórico de cálculos; Endpoints RESTful (POST /api/calculos/{tipo}, CRUD de obras); Validação estrita de inputs e tratamento consistente de erros JSON
   - **Frontend:** Conexão com API Lumen via Fetch/Axios; abas interativas para cada módulo; opção de gravar cálculo na base de dados da obra

4. **Modo de Operação:** Fase 1 (Docker/Setup) → Fase 2 (Modelagem/DB) → Fase 3 (API Lumen) → Fase 4 (Frontend/Testes), ticket por ticket, cada etapa funcional e testada.
