Type: dependency
Status: open
Blocked by: 02

# Ticket 03 — Migrations e Seeders

## Objetivo
Criar as migrations e seeders do banco de dados para tabelas de obras, parâmetros de insumos e histórico de cálculos.

## Critérios de aceitação
- Migration `normativas_tecnicas`: id, codigo, nome, area_cobertura_postura_m2_por_ave, area_cobertura_cria_m2_por_ave, area_cobertura_recria_m2_por_ave, piquete_normal_m2_por_ave, piquete_semiarido_m2_por_ave, poleiro_cm_por_ave, poleiro_espacamento_cm, aves_por_ninho, created_at
- Migration `projetos_aviario`: id, nome_obra, normativa_id, template_planta, finalidade, perfil_clima, qtd_aves, comprimento_m, largura_m, pe_direito_m, altura_cumeeira_m, altura_mureta_m, tipo_piso, tipo_cobertura, tipo_fechamento_base, checklist_local_json, orcamento_calculado_json, created_at, foreign key normativa_id
- Seeders populando `normativas_tecnicas` com perfis Embrapa Meio-Norte e CPT Orgânico
- `php artisan migrate` e `php artisan db:seed` funcionam no container
- Relacionamento foreign key entre projetos_aviario e normativas_tecnicas

## Notas
Baseado no modelo de dados do `chat.md` (Turn 5-6)
