<?php

namespace App\Http\Controllers;

use App\Models\ProjetoAviario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ObrasController extends Controller
{
    public function index()
    {
        $obras = ProjetoAviario::all();
        return response()->json($obras);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nome_obra' => 'required|string',
            'normativa_id' => 'required|integer|exists:normativas_tecnicas,id',
            'template_planta' => 'required|string',
            'finalidade' => 'required|string',
            'perfil_clima' => 'required|string',
            'qtd_aves' => 'required|integer',
            'comprimento_m' => 'required|numeric',
            'largura_m' => 'required|numeric',
            'pe_direito_m' => 'required|numeric',
            'altura_cumeeira_m' => 'required|numeric',
            'altura_mureta_m' => 'required|numeric',
            'tipo_piso' => 'required|string',
            'tipo_cobertura' => 'required|string',
            'tipo_fechamento_base' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $obra = ProjetoAviario::create($request->all());
        return response()->json($obra, 201);
    }

    public function show($id)
    {
        $obra = ProjetoAviario::find($id);
        if (!$obra) {
            return response()->json(['error' => 'Obra não encontrada'], 404);
        }
        return response()->json($obra);
    }

    public function update(Request $request, $id)
    {
        $obra = ProjetoAviario::find($id);
        if (!$obra) {
            return response()->json(['error' => 'Obra não encontrada'], 404);
        }

        $validator = Validator::make($request->all(), [
            'normativa_id' => 'sometimes|integer|exists:normativas_tecnicas,id',
            'qtd_aves' => 'sometimes|integer',
            'comprimento_m' => 'sometimes|numeric',
            'largura_m' => 'sometimes|numeric',
            'pe_direito_m' => 'sometimes|numeric',
            'altura_cumeeira_m' => 'sometimes|numeric',
            'altura_mureta_m' => 'sometimes|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $obra->fill($request->all());
        $obra->save();
        return response()->json($obra);
    }

    public function destroy($id)
    {
        $obra = ProjetoAviario::find($id);
        if (!$obra) {
            return response()->json(['error' => 'Obra não encontrada'], 404);
        }
        $obra->delete();
        return response()->json(null, 204);
    }
}
