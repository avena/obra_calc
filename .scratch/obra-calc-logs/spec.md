# Spec — Sistema de Logs com Data para Análise e Debug

## Problem Statement

O desenvolvedor precisa rastrear e analisar execuções do sistema (frontend, backend, comandos just) com logs organizados por data para facilitar debug e diagnóstico de problemas.

## Solution

Criar um sistema unificado de logs que registra todas as ações relevantes em uma pasta `logs/` na raiz do projeto, com arquivos nomeados por data (YYYY-MM-DD) e timestamp de execução. Tanto o backend Lumen quanto o frontend e comandos do justfile devem gerar logs rastreáveis.

## User Stories

1. Como desenvolvedor, quero que todos os comandos do justfile gerem logs em `logs/YYYY-MM-DD/`, para poder auditar o que foi executado.
2. Como desenvolvedor, quero logs de inicialização do frontend (dev/build) com timestamp, para debug.
3. Como desenvolvedor, quero logs do backend Lumen com requisições e erros em formato estruturado.
4. Como desenvolvedor, quero um comando `just logs` para visualizar logs do dia ou listar logs disponíveis.
5. Como desenvolvedor, quero que erros sejam automaticamente logados com stack trace.
6. Como desenvolvedor, quero logs separados por componente (frontend, backend, docker, just).

## Implementation Decisions

- **Pasta**: `logs/` na raiz do projeto (adicionar ao .gitignore exceto README)
- **Nomenclatura**: `logs/YYYY-MM-DD/HH-MM-SS-<componente>.log`
- **Backend**: Aproveitar sistema de logs do Lumen (Monolog) configurado para gravar em `logs/YYYY-MM-DD/`
- **Frontend**: Logger simples para registrar ações importantes
- **Justfile**: Wrapper para comandos que registra execução em logs
- **Rotação**: Logs diários automáticos

## Testing Decisions

- Verificar criação da pasta logs/
- Verificar geração de logs ao executar comandos
- Validar formato e timestamp dos logs

## Out of Scope

- Envio de logs para serviços externos (Sentry, Logstash)
- Interface web para visualização de logs

## Further Notes

Logs devem conter timestamp, componente, nível (INFO/ERROR/WARN/DEBUG), mensagem e contexto quando aplicável.
