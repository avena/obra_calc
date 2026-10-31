# Spec — Redesign frontend to Precision Field & Site System (dark Bootstrap UI)

GitHub issue: https://github.com/avena/obra_calc/issues/17

## Problem Statement

The current frontend uses Bootstrap 5 with a light theme and generic card layouts. It does not match the professional, high-contrast, dark "Precision Field & Site System" design intended for construction managers and engineers working in low-light site trailers and field conditions. A static HTML prototype and a design-system document define the target visual language (industrial amber on deep slate, IBM Plex Sans/Mono, soft radii, tonal layering), but none of it has been carried into the React application. The redesign must preserve every existing calculator and the backend integration while replacing the presentation layer, and must keep Bootstrap 5 as the styling framework already used by the project.

## Solution

Restyle the existing Bootstrap 5 frontend to the dark, high-contrast visual language using Bootstrap's theming (CSS custom properties / color modes) plus project CSS, without migrating to another framework. Apply the design-system tokens (deep slate surfaces, industrial amber primary, IBM Plex Sans/Mono fonts, 8px spacing rhythm, soft radii) through Bootstrap variables and a small custom stylesheet. Restyle every module (Alvenaria, Piso, Argamassa, Concreto, Aço, Galinheiro, Aviário planta SVG, and Obras manager) to use Bootstrap dark components with monospace typography for numeric inputs and readouts, anchored unit labels, and high-contrast result tiles. Keep all calculation logic, state management, and API calls unchanged.

## User Stories

1. As a site manager, I want a dark, high-contrast dashboard, so that I can read values in low-light trailers and bright field conditions.
2. As an engineer, I want numeric inputs rendered in a monospace face with anchored unit labels, so that I avoid misreading dimensions and quantities.
3. As a user, I want a tab for each calculation module, so that I can switch between Alvenaria, Piso, Argamassa, Concreto, Aço, Galinheiro and Aviário without losing context.
4. As a user, I want the active tab to be visually unmistakable, so that I always know which module I am using.
5. As a user, I want Alvenaria inputs (length, height, door/window areas, block type) in a structured card, so that I can compute block quantities with the 5% loss margin.
6. As a user, I want Piso inputs (room area, piece dimensions, loss percentage) in a structured card, so that I can compute tile quantities.
7. As a user, I want Argamassa traço cards (1:3, 1:4, 1:6) with cement consumption, so that I can choose the right mix and compute volume.
8. As a user, I want Concreto inputs (volume, target strength) with a result breakdown, so that I can estimate cement, sand and aggregate.
9. As a user, I want Aço linear-weight and bar-count readouts, so that I can size reinforcement.
10. As a user, I want Galinheiro area zones and material quantities, so that I can plan poultry housing.
11. As a user, I want the Aviário SVG plant with compartment details and capacity breakdown, so that I can review the structural layout.
12. As a user, I want an Obras manager table with search/filter, so that I can find registered projects quickly.
13. As a user, I want a "Nova Obra" modal with all project fields, so that I can register a new project without leaving the dashboard.
14. As a user, I want summary metric tiles (total projects, total area, estimated budget, active aviary capacity), so that I can see portfolio status at a glance.
15. As a user, I want toast notifications instead of native browser alerts, so that feedback matches the visual system.
16. As a user, I want delete confirmation and edit flows to work on the project table, so that I can manage projects.
17. As a user, I want SVG plant export, so that I can share the structural drawing.
18. As a user, I want the backend status badge, so that I know whether the Lumen API is online.
19. As a developer, I want Bootstrap theme tokens matching the design system, so that colors, fonts, spacing and radii are consistent across components.
20. As a developer, I want calculation logic and API integration untouched by the redesign, so that no regressions occur in quantities.
21. As a developer, I want responsive layouts down to tablet widths, so that the app works on rugged field devices.
22. As a developer, I want accessible tab roles and labels preserved, so that keyboard and screen-reader users are not regressed.

## Implementation Decisions

- Keep Bootstrap 5.3.8 as the CSS framework; do not add Tailwind or PostCSS.
- Apply the "Precision Field & Site System" tokens through Bootstrap CSS variables and a small custom stylesheet: deep slate surfaces, industrial amber primary, IBM Plex Sans/Mono font families, 8px spacing rhythm, soft radii (0.25rem base).
- Enable Bootstrap's dark color mode for the app shell and components.
- Rebuild the app shell using Bootstrap layout primitives: a top header with title, status badge and action buttons; a Bootstrap nav-tabs bar for modules; a main content area; a footer.
- Restyle each calculator component as a Bootstrap card with grouped form controls, monospace inputs with anchored unit labels (via input groups or floating labels), a primary amber calculate button, and Bootstrap alert/readout tiles for results.
- Restyle the Obras manager: metric cards, search input, Bootstrap table, and a Bootstrap modal for creating/editing projects; use Bootstrap toasts for feedback.
- Keep all existing state, calculation functions, and calls to `services/api` exactly as they are; only JSX/className/CSS change.
- Preserve `role="tab"`, `aria-selected`, and tab labels so navigation semantics remain.
- Keep the Aviário SVG markup and its compartment interaction; restyle surrounding chrome only.
- Do not change the backend, database, or API contracts.

## Testing Decisions

- A good test verifies external behavior (rendered text, roles, user flows and computed results), not CSS classes or Bootstrap utility names.
- Modules tested: every calculator component and the App tab-navigation integration test, plus Obras manager where feasible.
- Prior art: the existing tests under `src/__tests__/` (component tests and `app-tabs.integ.test.tsx`).
- Update selectors and assertions that depend on Bootstrap markup (e.g. `nav nav-tabs`, Font Awesome icons) to the new structure, while retaining the same behavioral expectations.
- Do not add implementation-detail or snapshot tests of utility classes.

## Out of Scope

- Backend, database, migrations, or API changes.
- New calculation features or new modules.
- Migration to Tailwind or any other CSS framework.
- The prototype's unrelated sidebar entries (Construction Estimator, Agricultural Land, Load Calculator, Materials & Stock).
- Visual regression / screenshot testing infrastructure.
- Internationalization or new languages.

## Further Notes

The provided HTML prototype and design-system document are the visual source of truth; the static prototype is not shipped as-is, and its Tailwind classes are translated to Bootstrap equivalents. Calculation formulas continue to follow `primeiro-prompt.txt` and the Embrapa rules documented in the repo.
