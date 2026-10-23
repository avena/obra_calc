<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class MigrationsSeedersTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();

        $this->artisan('migrate:fresh');
        $this->artisan('db:seed');
    }

    /** @test */
    public function normativas_tecnicas_tem_todas_as_colunas_esperadas(): void
    {
        $colunasEsperadas = [
            'id',
            'codigo',
            'nome',
            'area_cobertura_postura_m2_por_ave',
            'area_cobertura_cria_m2_por_ave',
            'area_cobertura_recria_m2_por_ave',
            'piquete_normal_m2_por_ave',
            'piquete_semiarido_m2_por_ave',
            'poleiro_cm_por_ave',
            'poleiro_espacamento_cm',
            'aves_por_ninho',
            'created_at',
        ];

        foreach ($colunasEsperadas as $coluna) {
            $this->assertTrue(
                Schema::hasColumn('normativas_tecnicas', $coluna),
                "A coluna {$coluna} deve existir em normativas_tecnicas"
            );
        }
    }

    /** @test */
    public function projetos_aviario_tem_todas_as_colunas_esperadas(): void
    {
        $colunasEsperadas = [
            'id',
            'nome_obra',
            'normativa_id',
            'template_planta',
            'finalidade',
            'perfil_clima',
            'qtd_aves',
            'comprimento_m',
            'largura_m',
            'pe_direito_m',
            'altura_cumeeira_m',
            'altura_mureta_m',
            'tipo_piso',
            'tipo_cobertura',
            'tipo_fechamento_base',
            'checklist_local_json',
            'orcamento_calculado_json',
            'created_at',
        ];

        foreach ($colunasEsperadas as $coluna) {
            $this->assertTrue(
                Schema::hasColumn('projetos_aviario', $coluna),
                "A coluna {$coluna} deve existir em projetos_aviario"
            );
        }
    }

    /** @test */
    public function projetos_aviario_tem_foreign_key_para_normativas_tecnicas(): void
    {
        $foreignKeys = DB::select(
            "SELECT CONSTRAINT_NAME FROM information_schema.TABLE_CONSTRAINTS
             WHERE TABLE_SCHEMA = DATABASE()
               AND TABLE_NAME = 'projetos_aviario'
               AND CONSTRAINT_TYPE = 'FOREIGN KEY'"
        );

        $this->assertNotEmpty($foreignKeys, 'projetos_aviario deve possuir uma foreign key');

        $columnUses = DB::select(
            "SELECT COLUMN_NAME FROM information_schema.KEY_COLUMN_USAGE
             WHERE TABLE_SCHEMA = DATABASE()
               AND TABLE_NAME = 'projetos_aviario'
               AND COLUMN_NAME = 'normativa_id'
               AND REFERENCED_TABLE_NAME IS NOT NULL"
        );

        $this->assertNotEmpty($columnUses, 'normativa_id deve referenciar outra tabela');
    }

    /** @test */
    public function seeder_popula_normativas_tecnicas_com_embrapa_e_cpt(): void
    {
        $normativas = DB::table('normativas_tecnicas')->get();

        $this->assertCount(2, $normativas);

        $nomes = $normativas->pluck('nome')->toArray();
        $this->assertContains('Embrapa Meio-Norte', $nomes);
        $this->assertContains('CPT Orgânico', $nomes);
    }

    /** @test */
    public function norma_embrapa_tem_parametros_preenchidos(): void
    {
        $norma = DB::table('normativas_tecnicas')->where('nome', 'Embrapa Meio-Norte')->first();

        $this->assertNotNull($norma);
        $this->assertNotNull($norma->codigo);
        $this->assertNotNull($norma->area_cobertura_postura_m2_por_ave);
        $this->assertNotNull($norma->poleiro_cm_por_ave);
        $this->assertNotNull($norma->aves_por_ninho);
    }
}
