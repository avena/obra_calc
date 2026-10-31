# TODO — Obra Calc

Lista de itens pendentes e evoluções futuras do projeto.
Atualizado em: 31/10/2026

---

## 🔴 Prioridade Alta (funcional)

- [ ] **Subir containers Docker e rodar testes do backend**
  - Comando: `just up` → `just lumen-test`
  - Validar as 21 testes PHPUnit (ObrasController, CalculosController)
  - Verificar se o daemon Docker está disponível no ambiente

- [ ] **Validar fluxo end-to-end completo**
  - Subir backend (`just up`) + frontend (`npm run dev`)
  - Criar uma Obra → calcular Alvenaria/Piso/Concreto/Aço/Aviário → salvar cada cálculo
  - Abrir Relatório Consolidado → conferir totais de cimento/areia/brita/blocos
  - Imprimir / exportar PDF e conferir layout A4

- [ ] **Confirmar campo `orcamento_calculado_json` no banco**
  - Verificar migration `2026_10_23_000001_create_projetos_aviario_table.php`
  - Garantir que a coluna existe (usada pelo Catálogo Regional de Preços)
  - Se ausente, criar migration de alteração

---

## 🟡 Prioridade Média (qualidade)

- [ ] **Testar PWA em dispositivo móvel**
  - Instalar como app nativo (Chrome/Safari → "Adicionar à tela inicial")
  - Testar modo offline: desligar Wi-Fi → salvar cálculo → verificar fila pendente no header
  - Reconectar → clicar "Sincronizar Nuvem" → conferir dados no backend

- [ ] **Verificar Service Worker em produção (build)**
  - `npm run build` → servir `dist/` → confirmar registro do SW no DevTools
  - Testar cache de assets (FontAwesome, Bootstrap) offline

- [ ] **Revisar warnings do Jest**
  - `app-tabs.integ.test.tsx` exibe `fetch is not defined` no console (mock ausente)
  - Injetar mock global de `fetch` em `src/setupTests.ts`

---

## 🟢 Prioridade Baixa (futuro / opcional)

- [ ] **Deploy em produção (DreamHost)**
  - Configurar `.env` de produção
  - Build do frontend (`npm run build`) → upload dos assets estáticos
  - Docroot do backend em `backend/public/`
  - Script de release no `justfile`

- [ ] **Geração server-side de PDF (DomPDF)**
  - Endpoint no Lumen para gerar PDF do relatório consolidado
  - Útil para envio por e-mail / anexo em financiamento rural (Pronaf)

- [ ] **Catálogo global de preços por região**
  - Hoje o catálogo é por obra; criar tabela compartilhada de insumos padrão
  - Permitir que o usuário selecione a "praça comercial" e herde preços base

- [ ] **Versionamento de cálculos do Aviário**
  - Quando trocar template (7×4m ↔ 3×3m) na mesma obra, decidir:
    - Substituir cálculo anterior (atual) vs. manter histórico cumulativo
  - Adicionar campo `versao` ou `template_origem` na tabela `calculos`

- [ ] **Exportação de relatório em Excel/CSV**
  - Além do PDF, permitir download da tabela consolidada em formato tabular
  - Útil para importação em planilhas de orçamento

- [ ] **Notificações push (PWA)**
  - Alertar quando sincronização offline for concluída
  - Requer backend com Web Push API

---

## ✅ Concluído (referência)

- [x] Frontend: 7 calculadoras com fórmulas Embrapa/primeiro-prompt
- [x] Backend Lumen + MariaDB + Docker Compose (4 serviços)
- [x] CRUD de Obras com vínculo de cálculos
- [x] Planta Baixa SVG do Aviário (layout, cotas, cards)
- [x] Persistência de cálculos nas 6 calculadoras + aviário
- [x] Motor de consolidação de insumos (`consolidador.ts`)
- [x] Modal de Relatório Consolidado com impressão/PDF
- [x] PWA (manifest + service worker)
- [x] Catálogo Regional de Preços por obra
- [x] Testes Jest: 12 suites, 35/35 passando
- [x] TypeScript strict: sem erros
- [x] Build Vite: sucesso
- [x] Documentação: `docs/arquitetura/ARQUITETURA-COMPLETA.md`
- [x] Repositório sincronizado (`origin/main`)