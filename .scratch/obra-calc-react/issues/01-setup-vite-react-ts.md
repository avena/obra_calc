Type: setup
Status: open
Blocked by:

# Ticket 01 — Setup Vite + React + TypeScript

## Objetivo
Configurar o projeto do zero com Vite, React 18, TypeScript, e scripts de build/dev/preview.

## Critérios de aceitação
- `package.json` com dependências react, react-dom, bootstrap e devDeps vite, typescript, @vitejs/plugin-react, @types/react, @types/react-dom
- `vite.config.ts` funcional com plugin React
- `tsconfig.json` e `tsconfig.node.json` com strict mode
- `index.html` na raiz com `<div id="root"></div>` e links para vendor CSS
- `src/main.tsx` bootstrap do ReactDOM
- `npm run build` passa com sucesso
- `npx tsc --noEmit` passa sem erros

## Notas
Usar vendor local (não CDN) para Bootstrap e Font Awesome, conforme decidido no planejamento.
