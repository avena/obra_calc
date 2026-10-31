# Componentes Frontend — Obra Calc

Peanut contract para a camada de apresentação do `obra_calc`.

## Responsabilidades
- **Calculadoras Especializadas**: `Alvenaria`, `Piso`, `Argamassa`, `Concreto`, `Aco`, `Galinheiro`.
- **Visualização Gráfica**: `AviarioPlantaSVG` (planta baixa SVG interativa com zonas e exportação).
- **Gestão de Projetos**: `ObrasManager` (CRUD de obras e métricas).
- **Feedback**: `ToastNotification` (toasts Bootstrap customizados).

## Contratos e Invariantes
- **Tokens de Tema**: CSS Variables com suporte a `data-bs-theme="dark"` (padrão) e `light`.
- **Inputs**: Numéricos com tipografia monoespaçada (`IBM Plex Mono`) e sufixo de unidade (`.input-group-text`).
- **Resultados**: Tiles de destaque (`.readout-tile`) de alto contraste.
- **Isolamento**: Fórmulas locais baseadas em `primeiro-prompt.txt` / Embrapa sem dependência de estado externo obrigatório.
- **Comunicação Backend**: Exclusiva via `src/services/api.ts`.
