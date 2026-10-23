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
        Schema::create('projetos_aviario', function (Blueprint $table) {
            $table->id();
            $table->string('nome_obra');
            $table->foreignId('normativa_id')->constrained('normativas_tecnicas');
            $table->string('template_planta');
            $table->string('finalidade');
            $table->string('perfil_clima');
            $table->unsignedInteger('qtd_aves');
            $table->decimal('comprimento_m', 8, 2);
            $table->decimal('largura_m', 8, 2);
            $table->decimal('pe_direito_m', 8, 2);
            $table->decimal('altura_cumeeira_m', 8, 2);
            $table->decimal('altura_mureta_m', 8, 2);
            $table->string('tipo_piso');
            $table->string('tipo_cobertura');
            $table->string('tipo_fechamento_base');
            $table->json('checklist_local_json')->nullable();
            $table->json('orcamento_calculado_json')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projetos_aviario');
    }
};
