<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NormativaTecnica extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'normativas_tecnicas';

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
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
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'area_cobertura_postura_m2_por_ave' => 'decimal:2',
        'area_cobertura_cria_m2_por_ave' => 'decimal:2',
        'area_cobertura_recria_m2_por_ave' => 'decimal:2',
        'piquete_normal_m2_por_ave' => 'decimal:2',
        'piquete_semiarido_m2_por_ave' => 'decimal:2',
        'poleiro_cm_por_ave' => 'decimal:2',
        'poleiro_espacamento_cm' => 'decimal:2',
        'aves_por_ninho' => 'integer',
    ];

    /**
     * Get the projetos de aviário que utilizam esta normativa.
     */
    public function projetosAviario()
    {
        return $this->hasMany(ProjetoAviario::class, 'normativa_id');
    }
}
