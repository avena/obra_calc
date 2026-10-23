<?php

namespace App\Http\Controllers;

use App\Models\NormativaTecnica;

class NormativasController extends Controller
{
    public function index()
    {
        return response()->json(NormativaTecnica::all());
    }
}
