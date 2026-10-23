<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('normativas_tecnicas', function (Blueprint $table) {
            $table->id();
            $table->string('codigo')->unique();
            $table->string('nome');
            $table->decimal('area_cobertura_postura_m2_por_ave', 8, 2);
            $table->decimal('area_cobertura_cria_m2_por_ave', 8, 2);
            $table->decimal('area_cobertura_recria_m2_por_ave', 8, 2);
            $table->decimal('piquete_normal_m2_por_ave', 8, 2);
            $table->decimal('piquete_semiarido_m2_por_ave', 8, 2);
            $table->decimal('poleiro_cm_por_ave', 8, 2);
            $table->decimal('poleiro_espacamento_cm', 8, 2);
            $table->unsignedSmallInteger('aves_por_ninho');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('normativas_tecnicas');
    }
};
