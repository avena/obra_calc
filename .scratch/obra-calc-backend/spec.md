# Spec — Backend Lumen + MariaDB + Docker (Obra Calc)

## Problem Statement

O frontend React/Vite da `obra_calc` já calcula materiais de construção (blocos, piso, argamassa, concreto, aço) e aviários/galinheiros localmente, mas não persiste nada. O usuário precisa de um backend em PHP com micro-framework Lumen que exponha uma API REST para salvar e consultar obras, orçamentos e medições, rodando em Docker Compose espelhando as restrições de deploy do ambiente DreamHost (servidor compartilhado com PHP + MySQL/MariaDB).

## Solution

Uma API REST desenvolvida em **PHP com Lumen**, conectada a **MariaDB/MySQL**, orquestrada via **Docker Compose** local (PHP-FPM + Apache/Nginx proxy + MariaDB), espelhando as restrições do DreamHost (pasta `public/` como docroot, `.env` e `vendor/` fora do docroot). O frontend React/Vite já implementado consome os endpoints via Fetch/Axios para cálculo interativo e salvamento de orçamentos/medições.

## User Stories

1. Como desenvolvedor, quero que o backend esteja rodando em Docker Compose com PHP-FPM, servidor web e MariaDB, para poder desenvolver e testar localmente espelhando o DreamHost.
2. Como desenvolvedor, quero que o `docker-compose.yml` suba os serviços PHP (com extensões pdo_mysql, mbstring, openssl, bcmath, gd, intl, zip, xml), servidor web (Apache ou Nginx com rewrites para `public/`) e MariaDB com credenciais configuráveis via `.env`, para ter um ambiente de dev reproduzível.
3. Como usuário, quero salvar uma obra com nome, endereço, cliente, data de início e status, para ter um cabeçalho de projeto que agrupa cálculos e orçamentos.
4. Como usuário, quero listar todas as obras cadastradas, para encontrar rapidamente um projeto existente.
5. Como usuário, quero detalhar uma obra específica, para ver seus dados e os cálculos associados.
6. Como usuário, quero editar os dados de uma obra, para corrigir informações ou atualizar o status.
7. Como usuário, quero deletar uma obra, para remover projetos que não são mais necessários.
8. Como usuário, quero salvar um cálculo de alvenaria informando comprimento, altura, área de portas/janelas e tipo de bloco, para persistir o orçamento de blocos.
9. Como usuário, quero salvar um cálculo de piso informando área do ambiente, dimensões da peça e perda, para persistir o orçamento de pisos.
10. Como usuário, quero salvar um cálculo de argamassa informando área da parede e espessura, para persistir o orçamento de reboco.
11. Como usuário, quero salvar um cálculo de concreto informando comprimento, largura e altura, para persistir o orçamento de concreto.
12. Como usuário, quero salvar um cálculo de aço informando diâmetro, comprimento total, espaçamento e comprimento da laje, para persistir o orçamento de aço.
13. Como usuário, quero salvar um cálculo de galinheiro informando comprimento, largura e galinhas por m², para persistir o orçamento de galinheiro.
14. Como usuário, quero salvar um cálculo de aviário (Embrapa) informando número de aves, template de planta, perfil regional e dimensões construtivas, para persistir o orçamento de aviário orgânico/caipira.
15. Como usuário, quero que o endpoint `POST /api/calculos/{tipo}` retorne o resultado do cálculo imediatamente, para ver os quantitativos antes de salvar.
16. Como usuário, quero listar todos os cálculos de uma obra, para revisar o histórico de orçamentos.
17. Como usuário, quero detalhar um cálculo específico, para ver os parâmetros e resultado salvos.
18. Como usuário, quero deletar um cálculo de uma obra, para remover orçamentos incorretos.
19. Como usuário, quero que a API valide estritamente os inputs (payloads) e retorne erros JSON consistentes, para não salvar dados inválidos.
20. Como desenvolvedor, quero que o banco tenha migrations e seeders para tabelas de obras, parâmetros de insumos e histórico de cálculos, para inicializar o ambiente rapidamente.
21. Como desenvolvedor, quero que as tabelas de parâmetros de insumos (rendimentos de blocos, espessuras de lajes, pesos lineares de aço) estejam populadas via seeder, para não cadastrar manualmente.
22. Como desenvolvedor, quero que a estrutura de pastas respeite a convenção DreamHost (`public/` como docroot, `.env` e `vendor/` fora do docroot), para facilitar o deploy futuro em servidor compartilhado.
23. Como desenvolvedor, quero que a API tenha CORS configurado para desenvolvimento local, para o frontend React consumir os endpoints sem bloqueio de navegador.
24. Como usuário, quero que o frontend consiga salvar o resultado de uma aba de cálculo na base de dados da obra, para ter o orçamento persistido.

## Implementation Decisions

- **Stack**: PHP 8.x + Lumen (micro-framework Laravel enxuto) + MariaDB/MySQL + Docker Compose
- **Serviços Docker**: PHP-FPM (porta 9000), Apache ou Nginx (proxy reverso FastCGI → PHP:9000, porta 8084), MariaDB (porta 3306)
- **Extensões PHP**: pdo_mysql, mbstring, openssl, bcmath, gd, intl, zip, xml, exif, sockets
- **Estrutura de pastas**: `public/` como docroot, `.env` e `vendor/` fora do docroot (compatibilidade DreamHost compartilhado)
- **Camadas do backend**: Controllers (recebem requisição HTTP), Services/Domain (regras de cálculo e negócio), Repositories/Models (acesso a banco), Migrations e Seeders
- **Tabelas principais**: `normativas_tecnicas` (perfis normativos versionáveis: Embrapa Meio-Norte, CPT Orgânico), `projetos_aviario` (cabeçalho da obra com orçamento calculado em JSON)
- **Endpoints REST**: `POST /api/calculos/{tipo}`, CRUD completo para obras (`GET/POST/PUT/DELETE /api/obras`), CRUD para cálculos vinculados a obras
- **Validação**: Regras estritas de input no Lumen (Request validation), tratamento consistente de erros JSON
- **Comunicação frontend-backend**: Fetch/Axios do React para `http://localhost:8084/api/...` com CORS habilitado em dev
- **Persistência de cálculo**: O resultado do cálculo (parâmetros + resultado em JSON) é salvo vinculado a uma obra
- **Normativas versionáveis**: Tabela `normativas_tecnicas` permite alternar entre perfis (Embrapa, CPT) sem hardcode de parâmetros

## Testing Decisions

- **O que é um bom teste**: Testa comportamento externo da API — dado um payload de entrada, a API retorna o status HTTP e corpo JSON esperados. Não testa internos do Lumen.
- **Módulos testados**: Controllers de obras e cálculos, Services de cálculo (fórmulas), validação de requests, migrations/seeders
- **Ferramenta**: PHPUnit (padrão do Lumen/Laravel) com banco SQLite em memória para testes rápidos, ou MariaDB de teste via Docker
- **Prior art**: Nenhum teste de backend existe ainda no repositório; estes serão os primeiros a estabelecer o padrão
- **Cobertura crítica**: Endpoint `POST /api/calculos/{tipo}` para cada tipo (alvenaria, piso, argamassa, concreto, aço, galinheiro, aviario), CRUD de obras, validação de entrada inválida

## Out of Scope

- Autenticação e autorização de usuários (login, JWT, roles)
- Multi-tenancy ou isolamento de dados por usuário
- Exportação para PDF ou impressão de orçamentos
- WebSocket ou tempo real
- Deploy em produção (apenas ambiente de dev local com Docker)
- Integração com APIs de IA externas (OpenAI, Gemini, etc.) — escopo futuro
- Bancos de dados vetoriais (pgvector, Pinecone, etc.) — escopo futuro para IA/RAG

## Further Notes

- O frontend React/Vite já está implementado e commitado na branch `main` com 7 módulos de cálculo (Alvenaria, Piso, Argamassa, Concreto, Aço, Galinheiro, Aviário Planta SVG) e 32 testes passando
- O `justfile` já existe com receitas de dev (`devup`, `devdown`, `build`, `test`, etc.); será estendido com receitas do backend Lumen (`lumen-up`, `lumen-down`, `lumen-migrate`, `lumen-seed`, etc.)
- Referência local para DreamHost: `~/dreamhost` (PHP 8.5.5 FPM + Apache + `php-dreamhost.ini` com 112 diretivas)
- O arquivo `chat.md` (Gemini Chat, 23/Out/2026) contém o prompt estruturado original e as regras do Embrapa Meio-Norte para aviários, usado como base deste spec
- Os tickets associados devem ser publicados no issue tracker (`.scratch/` e GitHub Issues) com a label `ready-for-agent`
