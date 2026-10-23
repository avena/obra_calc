<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CalculosController extends Controller
{
    public function calcular(Request $request, $tipo)
    {
        switch ($tipo) {
            case 'alvenaria':
                return $this->alvenaria($request);
            case 'piso':
                return $this->piso($request);
            case 'argamassa':
                return $this->argamassa($request);
            case 'concreto':
                return $this->concreto($request);
            case 'aco':
                return $this->aco($request);
            case 'galinheiro':
                return $this->galinheiro($request);
            case 'aviario-embrapa':
            case 'aviario':
                return $this->aviarioEmbrapa($request);
            default:
                return response()->json(['error' => 'Tipo de cálculo não suportado'], 400);
        }
    }

    private function alvenaria(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'comprimento' => 'required|numeric',
            'altura' => 'required|numeric',
            'area_portas' => 'required|numeric',
            'area_janelas' => 'required|numeric',
            'tipo_bloco' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $comp = (float)$request->input('comprimento');
        $alt = (float)$request->input('altura');
        $areaPortas = (float)$request->input('area_portas');
        $areaJanelas = (float)$request->input('area_janelas');
        $tipoBloco = $request->input('tipo_bloco');

        $areaTotal = $comp * $alt;
        $areaLiquida = $areaTotal - $areaPortas - $areaJanelas;
        if ($areaLiquida < 0) {
            $areaLiquida = 0;
        }

        $rendimento = 25; // padrão 9x19x19
        if ($tipoBloco === '9x19x29') {
            $rendimento = 16.7;
        } elseif ($tipoBloco === '9x19x39') {
            $rendimento = 12.5;
        }

        $quantidadeBlocos = $areaLiquida * $rendimento;
        $quantidadeBlocosComPerda = $quantidadeBlocos * 1.05;

        return response()->json([
            'area_total' => round($areaTotal, 2),
            'area_liquida' => round($areaLiquida, 2),
            'rendimento_por_m2' => $rendimento,
            'quantidade_blocos' => round($quantidadeBlocos, 2),
            'quantidade_blocos_com_perda' => round($quantidadeBlocosComPerda, 2),
        ]);
    }

    private function piso(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'area_ambiente' => 'required|numeric',
            'largura_peca' => 'required|numeric',
            'comprimento_peca' => 'required|numeric',
            'perda' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $areaAmbiente = (float)$request->input('area_ambiente');
        $larguraPeca = (float)$request->input('largura_peca');
        $comprimentoPeca = (float)$request->input('comprimento_peca');
        $perda = (float)$request->input('perda');

        $areaPeca = $larguraPeca * $comprimentoPeca;
        if ($areaPeca <= 0) {
            $areaPeca = 0.0001;
        }
        $quantidadePecas = $areaAmbiente / $areaPeca;
        $quantidadePecasComPerda = $quantidadePecas * (1 + $perda / 100);

        return response()->json([
            'area_ambiente' => round($areaAmbiente, 2),
            'area_peca' => round($areaPeca, 4),
            'quantidade_pecas' => ceil($quantidadePecasComPerda),
            'quantidade_pecas_sem_perda' => round($quantidadePecas, 2),
        ]);
    }

    private function argamassa(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'area_parede' => 'required|numeric',
            'espessura' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $areaParede = (float)$request->input('area_parede');
        $espessura = (float)$request->input('espessura');

        $volumeM3 = $areaParede * $espessura;
        $latas18L = $volumeM3 * 56;

        return response()->json([
            'area_parede' => round($areaParede, 2),
            'espessura_m' => round($espessura, 3),
            'volume_m3' => round($volumeM3, 3),
            'latas_18l' => round($latas18L, 2),
        ]);
    }

    private function concreto(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'comprimento' => 'required|numeric',
            'largura' => 'required|numeric',
            'altura' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $comp = (float)$request->input('comprimento');
        $larg = (float)$request->input('largura');
        $alt = (float)$request->input('altura');

        $volumeM3 = $comp * $larg * $alt;

        return response()->json([
            'volume_m3' => round($volumeM3, 3),
        ]);
    }

    private function aco(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'diametro' => 'required|numeric',
            'comprimento_total' => 'required|numeric',
            'espacamento' => 'required|numeric',
            'comprimento_laje' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $diametro = (float)$request->input('diametro');
        $comprimentoTotal = (float)$request->input('comprimento_total');
        $espacamento = (float)$request->input('espacamento');
        $comprimentoLaje = (float)$request->input('comprimento_laje');

        $pesoLinearKgM = ($diametro * $diametro) / 162;
        $quantidadeBarras = ($comprimentoLaje / $espacamento) + 1;
        if ($quantidadeBarras < 0) {
            $quantidadeBarras = 0;
        }
        $pesoTotalKg = $pesoLinearKgM * $comprimentoTotal * $quantidadeBarras;

        return response()->json([
            'peso_linear_kg_m' => round($pesoLinearKgM, 3),
            'quantidade_barras' => ceil($quantidadeBarras),
            'peso_total_kg' => round($pesoTotalKg, 2),
        ]);
    }

    private function galinheiro(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'comprimento' => 'required|numeric',
            'largura' => 'required|numeric',
            'galinhas_por_m2' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $c = (float)$request->input('comprimento');
        $l = (float)$request->input('largura');
        $gmpq = (float)$request->input('galinhas_por_m2');

        $areaTotal = $c * $l;
        $areaPostura = $areaTotal * 0.30;
        $areaPernoite = $areaTotal * 0.40;
        $areaPasto = $areaTotal * 0.30;
        $totalGalinhas = (int)floor($areaTotal * $gmpq);
        $madeiraM = 2 * ($c + $l);
        $areaParede = 2 * ($c + $l) * 2.0;
        $tijoloUnidades = (int)ceil($areaParede / 0.01);

        return response()->json([
            'area_total' => round($areaTotal, 2),
            'area_postura' => round($areaPostura, 2),
            'area_pernoite' => round($areaPernoite, 2),
            'area_pasto' => round($areaPasto, 2),
            'total_galinhas' => $totalGalinhas,
            'madeira_m' => round($madeiraM, 2),
            'tijolo_unidades' => $tijoloUnidades,
        ]);
    }

    private function aviarioEmbrapa(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'numero_aves' => 'required|numeric',
            'template' => 'required|string',
            'perfil_regional' => 'required|string',
            'comprimento' => 'required|numeric',
            'largura' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $numeroAves = (int)$request->input('numero_aves');
        $template = $request->input('template');
        $perfilRegional = $request->input('perfil_regional');
        $comp = (float)$request->input('comprimento');
        $larg = (float)$request->input('largura');

        $areaTotal = $comp * $larg;
        // Embrapa Meio-Norte values (simplified)
        $areaPorAve = 0.0625; // 1/16 approx for some systems
        if ($perfilRegional === 'semiarido') {
            $areaPorAve = 0.08;
        }

        $dimensionamento = [
            'numero_aves' => $numeroAves,
            'area_total_m2' => round($areaTotal, 2),
            'area_por_ave_m2' => $areaPorAve,
            'area_recomendada_m2' => round($numeroAves * $areaPorAve, 2),
            'template' => $template,
            'perfil_regional' => $perfilRegional,
            'densidade_aves_m2' => round($numeroAves / max($areaTotal, 0.01), 2),
            'orientacao_sugerida' => 'Leste-Oeste',
            'poleiros' => [
                'quantidade_sugerida' => (int)round($numeroAves * 0.15),
                'comprimento_cm_por_ave' => 15,
            ],
            'ninhos' => [
                'quantidade_sugerida' => (int)ceil($numeroAves / 5),
            ],
        ];

        return response()->json([
            'dimensionamento' => $dimensionamento,
            'materiais' => [
                'madeira_m' => round(2 * ($comp + $larg), 2),
                'tela_m2' => round($areaTotal * 1.1, 2),
                'telhas_unidades' => (int)ceil($areaTotal / 1.5),
            ],
        ]);
    }
}
