<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class NormativasTecnicasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        DB::table('normativas_tecnicas')->insertOrIgnore([
            [
                'codigo' => 'EMBRAPA-MN-001',
                'nome' => 'Embrapa Meio-Norte',
                'area_cobertura_postura_m2_por_ave' => 0.09,
                'area_cobertura_cria_m2_por_ave' => 0.06,
                'area_cobertura_recria_m2_por_ave' => 0.08,
                'piquete_normal_m2_por_ave' => 2.00,
                'piquete_semiarido_m2_por_ave' => 3.00,
                'poleiro_cm_por_ave' => 15.00,
                'poleiro_espacamento_cm' => 30.00,
                'aves_por_ninho' => 7,
                'created_at' => Carbon::now()->toDateTimeString(),
            ],
            [
                'codigo' => 'CPT-ORG-001',
                'nome' => 'CPT Orgânico',
                'area_cobertura_postura_m2_por_ave' => 0.11,
                'area_cobertura_cria_m2_por_ave' => 0.07,
                'area_cobertura_recria_m2_por_ave' => 0.09,
                'piquete_normal_m2_por_ave' => 4.00,
                'piquete_semiarido_m2_por_ave' => 6.00,
                'poleiro_cm_por_ave' => 18.00,
                'poleiro_espacamento_cm' => 35.00,
                'aves_por_ninho' => 5,
                'created_at' => Carbon::now()->toDateTimeString(),
            ],
        ]);
    }
}
