# Concepts Brief — Metodologia EGM (Obra Calc)

**Data:** 31/10/2026  
**Status:** Aprovado para Fases Subsequentes  

## 1. Exportação de Relatório Orçamentário Consolidado em PDF
- **Objetivo:** Gerar documento técnico unificado contendo os dados da obra, cálculos de alvenaria, pisos, argamassa, concreto e aço, além do desenho da planta do aviário.
- **Trade-offs:** Geração client-side (`jsPDF` ou impressão nativa via `@media print`) vs server-side (DomPDF/Browsershot).
- **Recomendação:** Iniciar com estilização nativa `@media print` no navegador (zero dependências, aproveita o Bootstrap) e evoluir para geração server-side se envio por e-mail for necessário.

## 2. Modo Offline / PWA com Sincronização em Lote
- **Objetivo:** Permitir o uso das calculadoras e registro de medições em canteiros de obra sem conectividade à internet.
- **Trade-offs:** Complexidade de resolução de conflitos vs fila append-only.
- **Recomendação:** Service Worker para cache de assets estáticos e fila `localStorage`/`IndexedDB` para chamadas a `salvarCalculoNaObra`. Ao restabelecer conexão, disparar flush sequencial.

## 3. Catálogo de Materiais Customizável por Região
- **Objetivo:** Adequar rendimentos e dimensões padrão (ex: tijolos 9x19x19 vs blocos de concreto 14x19x39) de acordo com a praça regional de compra.
- **Trade-offs:** Tabela no MariaDB vs arquivo JSON de configuração estática.
- **Recomendação:** Criar catálogo em JSON no frontend pré-populado, permitindo sobrescrita de preços e rendimentos salvos no perfil da Obra.
