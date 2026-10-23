<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Calculo extends Model
{
    protected $table = 'calculos';

    protected $fillable = [
        'obra_id',
        'tipo',
        'parametros',
        'resultado',
    ];

    protected $casts = [
        'parametros' => 'array',
        'resultado' => 'array',
    ];

    public function obra()
    {
        return $this->belongsTo(ProjetoAviario::class, 'obra_id');
    }
}
