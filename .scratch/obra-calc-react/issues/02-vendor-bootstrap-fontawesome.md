Type: dependency
Status: open
Blocked by: 01

# Ticket 02 — Vendor Bootstrap + Font Awesome

## Objetivo
Disponibilizar Bootstrap 5.3.8 e Font Awesome 6.7.2 localmente em `vendor/` e copiar para `public/vendor/` para servir pelo Vite.

## Critérios de aceitação
- `vendor/bootstrap.min.css` presente
- `vendor/bootstrap.bundle.min.js` presente
- `vendor/fontawesome/fontawesome-free-6.7.2-web/css/all.min.css` presente
- `public/vendor/` espelhado a partir de `vendor/`
- `index.html` referencia `/vendor/bootstrap.min.css` e `/vendor/fontawesome/css/all.min.css`

## Notas
Arquivos já baixados anteriormente via curl/jsDelivr. Apenas organizar e versionar.
