<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjetoAviario extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'projetos_aviario';

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
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
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'qtd_aves' => 'integer',
        'comprimento_m' => 'decimal:2',
        'largura_m' => 'decimal:2',
        'pe_direito_m' => 'decimal:2',
        'altura_cumeeira_m' => 'decimal:2',
        'altura_mureta_m' => 'decimal:2',
        'checklist_local_json' => 'array',
        'orcamento_calculado_json' => 'array',
    ];

    /**
     * Get the normativa técnica associada a este projeto.
     */
    public function normativa()
    {
        return $this->belongsTo(NormativaTecnica::class, 'normativa_id');
    }
}
