<?php

namespace Tests\Feature;

use App\Models\NormativaTecnica;
use App\Models\ProjetoAviario;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class ObrasCrudTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();
        $this->artisan('migrate');
        $this->artisan('db:seed', ['--class' => 'NormativasTecnicasTableSeeder']);
    }

    public function tearDown(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        DB::table('projetos_aviario')->truncate();
        DB::table('normativas_tecnicas')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1');
        parent::tearDown();
    }

    private function getNormativaId(): int
    {
        return NormativaTecnica::first()->id;
    }

    private function validObraData(array $overrides = []): array
    {
        return array_merge([
            'nome_obra' => 'Aviário Teste',
            'normativa_id' => $this->getNormativaId(),
            'template_planta' => '7x4_5_fases',
            'finalidade' => 'postura',
            'perfil_clima' => 'meio_norte',
            'qtd_aves' => 1000,
            'comprimento_m' => 7.00,
            'largura_m' => 4.00,
            'pe_direito_m' => 2.80,
            'altura_cumeeira_m' => 3.50,
            'altura_mureta_m' => 0.60,
            'tipo_piso' => 'concreto',
            'tipo_cobertura' => 'telha_fibrocimento',
            'tipo_fechamento_base' => 'mureta_tela',
        ], $overrides);
    }

    public function test_get_obras_list_all_obras(): void
    {
        ProjetoAviario::create($this->validObraData(['nome_obra' => 'Obra 1']));
        ProjetoAviario::create($this->validObraData(['nome_obra' => 'Obra 2']));

        $this->get('/api/obras');
        $this->assertEquals(200, $this->response->getStatusCode());
        $data = json_decode($this->response->getContent(), true);
        $this->assertIsArray($data);
        $this->assertCount(2, $data);
    }

    public function test_post_obras_create_new_obra(): void
    {
        $data = $this->validObraData();
        $this->post('/api/obras', $data);
        $this->assertEquals(201, $this->response->getStatusCode());
        $response = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('id', $response);
        $this->assertEquals('Aviário Teste', $response['nome_obra']);
        $this->assertDatabaseHas('projetos_aviario', ['nome_obra' => 'Aviário Teste']);
    }

    public function test_get_obras_show_specific_obra(): void
    {
        $obra = ProjetoAviario::create($this->validObraData());
        $this->get('/api/obras/' . $obra->id);
        $this->assertEquals(200, $this->response->getStatusCode());
        $response = json_decode($this->response->getContent(), true);
        $this->assertEquals($obra->id, $response['id']);
        $this->assertEquals('Aviário Teste', $response['nome_obra']);
    }

    public function test_put_obras_update_obra(): void
    {
        $obra = ProjetoAviario::create($this->validObraData());
        $this->put('/api/obras/' . $obra->id, ['nome_obra' => 'Obra Atualizada']);
        $this->assertEquals(200, $this->response->getStatusCode());
        $response = json_decode($this->response->getContent(), true);
        $this->assertEquals('Obra Atualizada', $response['nome_obra']);
        $this->assertDatabaseHas('projetos_aviario', ['id' => $obra->id, 'nome_obra' => 'Obra Atualizada']);
    }

    public function test_delete_obras_delete_obra(): void
    {
        $obra = ProjetoAviario::create($this->validObraData());
        $this->delete('/api/obras/' . $obra->id);
        $this->assertEquals(204, $this->response->getStatusCode());
        $this->assertDatabaseMissing('projetos_aviario', ['id' => $obra->id]);
    }

    public function test_post_obras_validation_required_fields(): void
    {
        $this->post('/api/obras', []);
        $this->assertEquals(422, $this->response->getStatusCode());
        $response = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('errors', $response);
    }

    public function test_post_obras_foreign_key_normativa_id_respected(): void
    {
        $data = $this->validObraData(['normativa_id' => 99999]);
        $this->post('/api/obras', $data);
        $this->assertEquals(422, $this->response->getStatusCode());
    }
}
