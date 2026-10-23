Type: refactor
Status: open
Blocked by:

# Ticket 01 — Substituir alert() por Bootstrap Alerts/Toasts

## Objetivo
Substituir chamadas alert() nativas por componentes Bootstrap para manter consistência visual.

## Critérios de aceitação
- Remover todas as chamadas alert() de ObrasManager.tsx
- Criar componente reutilizável para notificações Bootstrap
- Exibir mensagens de sucesso/erro com classes Bootstrap (alert-dismissible ou toast)
- Feedback visual consistente com resto da aplicação

## Notas
Usar Bootstrap 5.3.8 já disponível no projeto
