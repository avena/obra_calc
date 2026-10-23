# Spec — Usar Bootstrap Alerts ao invés de alert() JS

## Problem Statement

O código atual usa `alert()` nativo do JavaScript para feedback ao usuário, o que não segue o padrão visual do Bootstrap já utilizado no projeto.

## Solution

Substituir todas as chamadas `alert()` por componentes/avisos do Bootstrap (toasts ou alerts) integrados à interface.

## User Stories

1. Como usuário, quero ver mensagens de sucesso/erro no padrão Bootstrap, para melhor integração visual
2. Como desenvolvedor, quero usar componentes Bootstrap ao invés de APIs nativas do browser

## Implementation Decisions

- Criar um componente Toast/Alert reutilizável
- Substituir alert() em ObrasManager por esse componente
- Usar classes Bootstrap (alert, toast)

## Testing Decisions

- Verificar que mensagens aparecem sem usar window.alert

## Out of Scope

- Alterar outros usos de alert() fora do escopo

## Further Notes

Manter consistência com o design system Bootstrap 5.3.8 já utilizado
