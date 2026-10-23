<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class CalculosTiposTest extends TestCase
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

    public function test_post_calculos_alvenaria(): void
    {
        $data = [
            'comprimento' => 5,
            'altura' => 3,
            'area_portas' => 1.68,
            'area_janelas' => 0,
            'tipo_bloco' => '9x19x19',
        ];
        $this->post('/api/calculos/alvenaria', $data);
        $this->assertEquals(200, $this->response->getStatusCode());
        $response = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('quantidade_blocos', $response);
        $this->assertArrayHasKey('quantidade_blocos_com_perda', $response);
    }

    public function test_post_calculos_piso(): void
    {
        $data = [
            'area_ambiente' => 10,
            'largura_peca' => 0.30,
            'comprimento_peca' => 0.30,
            'perda' => 10,
        ];
        $this->post('/api/calculos/piso', $data);
        $this->assertEquals(200, $this->response->getStatusCode());
        $response = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('quantidade_pecas', $response);
    }

    public function test_post_calculos_argamassa(): void
    {
        $data = [
            'area_parede' => 10,
            'espessura' => 0.02,
        ];
        $this->post('/api/calculos/argamassa', $data);
        $this->assertEquals(200, $this->response->getStatusCode());
        $response = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('volume_m3', $response);
        $this->assertArrayHasKey('latas_18l', $response);
    }

    public function test_post_calculos_concreto(): void
    {
        $data = [
            'comprimento' => 4,
            'largura' => 3,
            'altura' => 0.10,
        ];
        $this->post('/api/calculos/concreto', $data);
        $this->assertEquals(200, $this->response->getStatusCode());
        $response = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('volume_m3', $response);
    }

    public function test_post_calculos_aco(): void
    {
        $data = [
            'diametro' => 10,
            'comprimento_total' => 10,
            'espacamento' => 0.20,
            'comprimento_laje' => 4,
        ];
        $this->post('/api/calculos/aco', $data);
        $this->assertEquals(200, $this->response->getStatusCode());
        $response = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('peso_linear_kg_m', $response);
        $this->assertArrayHasKey('peso_total_kg', $response);
        $this->assertArrayHasKey('quantidade_barras', $response);
    }

    public function test_post_calculos_galinheiro(): void
    {
        $data = [
            'comprimento' => 5,
            'largura' => 4,
            'galinhas_por_m2' => 3,
        ];
        $this->post('/api/calculos/galinheiro', $data);
        $this->assertEquals(200, $this->response->getStatusCode());
        $response = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('area_total', $response);
        $this->assertArrayHasKey('area_postura', $response);
        $this->assertArrayHasKey('area_pernoite', $response);
        $this->assertArrayHasKey('area_pasto', $response);
        $this->assertArrayHasKey('total_galinhas', $response);
        $this->assertArrayHasKey('madeira_m', $response);
        $this->assertArrayHasKey('tijolo_unidades', $response);
    }

    public function test_post_calculos_aviario_embrapa(): void
    {
        $data = [
            'numero_aves' => 1000,
            'template' => '7x4_5_fases',
            'perfil_regional' => 'meio_norte',
            'comprimento' => 7,
            'largura' => 4,
        ];
        $this->post('/api/calculos/aviario-embrapa', $data);
        $this->assertEquals(200, $this->response->getStatusCode());
        $response = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('dimensionamento', $response);
    }
}
