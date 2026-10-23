# Spec — Conteúdo das Abas

## Problem Statement

As abas do frontend estão renderizando em branco porque os componentes usam classes Bootstrap de tab-pane que escondem o conteúdo por padrão.

## Solution

Corrigir as classes CSS dos componentes para que o conteúdo seja exibido corretamente.

## User Stories

1. Como usuário, quero ver o formulário de Alvenaria na aba correspondente.
2. Como usuário, quero ver o formulário de Piso na aba correspondente.
3. Como usuário, quero ver o formulário de Argamassa na aba correspondente.
4. Como usuário, quero ver o formulário de Concreto na aba correspondente.
5. Como usuário, quero ver o formulário de Aço na aba correspondente.
6. Como usuário, quero ver o formulário de Galinheiro na aba correspondente.
7. Como usuário, quero ver a planta SVG do Aviário na aba correspondente.

## Implementation Decisions

- Alterar className="tab-pane fade" para className="tab-pane fade show active"
- Simplificar estrutura do App.tsx para renderizar o painel ativo diretamente

## Testing Decisions

- Verificar que todas as abas exibem conteúdo

## Out of Scope

- Novas funcionalidades além das já existentes

## Further Notes

As fórmulas seguem o primeiro-prompt.txt e as regras do Embrapa Meio-Norte.
