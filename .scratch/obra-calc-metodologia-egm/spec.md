# Plano Unificado de Ação — Obra Calc

**Data:** 31/10/2026  
**Status:** Concluído  
**Branch Alvo:** `feat/ui-redesign-bootstrap-dark` → `main`

---

## 🎯 Objetivo Geral
Integrar a persistência de cálculos às Obras no Frontend, sanear pendências imediatas de UI e testes, auditar a segurança e conformidade via `@code-review`, e planejar a evolução metodológica com `@ask-matt` (avaliando `@egm-bootstrap` e `@egm-brainstorm`).

---

## 📋 Fases do Plano

### Fase 1: Saneamento Imediato de UI e Testes
1. **Ajustes nos Botões do Header (`src/App.tsx`, `src/index.css`)**:
   - "Sincronizar Nuvem": mudar de `btn-outline-primary` para `btn-secondary` estilizado para dark mode (preenchido, sem outline estridente).
   - "Nova Obra": ajustar contraste do texto no dark mode (usar texto escuro `#0f172a` sobre fundo âmbar `#f59e0b`), eliminando o aspecto esbranquiçado/lavado.
2. **Silenciar warnings do Jest (`src/setupTests.ts` / `src/__tests__/setup.test.ts`)**:
   - Injetar mock padrão de `globalThis.fetch` para a verificação de saúde (`ping()`) disparada na montagem do `App.tsx`.
   - Garantir 32/32 testes rodando limpos e sem poluição de stack trace de `fetch` no terminal.

### Fase 2: Vincular Cálculos às Obras no Frontend (Feature Principal)
1. **Gerenciamento de Obra Ativa**:
   - Criar estado / contexto para rastrear a "Obra Selecionada" atual.
   - Adicionar seletor visual no header ou em cada calculadora (ex: "Calculando para: Casa [Postura]").
2. **Ação de Persistência nas 6 Calculadoras**:
   - Inserir botão "Salvar Cálculo nesta Obra" junto ao bloco `.readout-tile` nos módulos:
     - `Alvenaria.tsx`
     - `Piso.tsx`
     - `Argamassa.tsx`
     - `Concreto.tsx`
     - `Aco.tsx`
     - `Galinheiro.tsx`
   - Integrar com o endpoint existente via `salvarCalculoNaObra(obraId, tipo, parametros, resultado)` de `src/services/api.ts`.
   - Feedback instantâneo via `ToastNotification`.
3. **Visualização do Histórico no `ObrasManager.tsx`**:
   - Adicionar aba ou modal de "Cálculos da Obra" para inspecionar os orçamentos e insumos já salvos pelo backend.

### Fase 3: Auditoria de Segurança e Qualidade com `@code-review`
1. **Execução da skill `@code-review`**:
   - Disparar análise em dois eixos (Standards e Spec) cobrindo todo o diff contra `main`.
   - Verificar sanitização, integridade de chamadas HTTP, tratamento de exceções e ausência de vazamento de credenciais/endpoints.
2. **Remediação Imediata**:
   - Corrigir qualquer inconformidade apontada pelo auditor antes do merge.

### Fase 4: Avaliação de Próximos Passos com `@ask-matt`
1. **Consulta de Fluxo (`@ask-matt`)**:
   - Mapear em qual ponto do ciclo Matt Pocock o projeto se encontra (Idea → Ship, Codebase Health ou On-ramps).
2. **Documentação Arquitetural com `@egm-bootstrap`**:
   - Gerar contratos EGM (Elephant-and-Goldfish Model): contratos nos pacotes (`src/components/README.md`, `backend/README.md`) e blueprint geral no repositório.
3. **Ideação de Novas Capacidades com `@egm-brainstorm`**:
   - Submeter novos conceitos à banca de Goldfishes:
     - Exportação de relatório orçamentário consolidado em PDF.
     - Suporte offline com PWA e sincronização em lote.
     - Catálogo de materiais customizáveis por região.

### Fase 5: Preparação para Deploy em Produção (Horizonte Futuro)
1. Configuração do `.env` e permissões para o servidor compartilhado DreamHost (docroot `backend/public/`).
2. Script de build e release no `justfile`.


---

## ADENDO - TAREFA 0 (PRÉ-EXECUÇÃO)

**Tarefa 0: Metodologia & Governança (OBRIGATÓRIA)**

Antes de iniciar qualquer outra fase, esta tarefa deve ser executada integralmente:

1. **Consultar `@ask-matt`** - Identificar em qual fluxo estamos (Main Flow: idea → ship / Codebase Health / On-ramps) e qual o próximo passo correto para o estado atual do `obra_calc`.
2. **Avaliar e executar `@egm-bootstrap`** - Gerar documentação arquitetural no modelo Elephant-and-Goldfish (Peanuts: `README.md` nos componentes/pacotes; Hay: blueprint/overview nos diretórios pais). Cobrir `src/`, `backend/`, `docs/` conforme aplicável.
3. **Avaliar e executar `@egm-brainstorm`** - Realizar brainstorming com as lentes Goldfish para refinar as ideias: Exportação PDF/Orçamento consolidado, Modo Offline/PWA com sincronização, Catálogo de materiais customizável por região. Gerar `concepts_brief.md` em `.scratch/obra-calc-metodologia-egm/` com análise, trade-offs, alternativas e recomendações.

**Saída esperada da Tarefa 0:** Relatório consolidado com recomendações de fluxo, estrutura EGM gerada/validada e `concepts_brief.md` aprovado para guiar as fases seguintes.
