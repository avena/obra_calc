<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ProjetoAviario extends Model
{
    protected $table = 'projetos_aviario';

    protected $fillable = [
        'uuid',
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

    public function normativa()
    {
        return $this->belongsTo(NormativaTecnica::class, 'normativa_id');
    }

    public function calculos()
    {
        return $this->hasMany(Calculo::class, 'obra_id');
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->uuid)) {
                $model->uuid = Str::uuid()->toString();
            }
        });
    }
}
