<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('projetos_aviario', function (Blueprint $table) {
            $table->string('uuid', 36)->nullable()->after('id');
        });

        DB::table('projetos_aviario')->whereNull('uuid')->get()->each(function ($obra) {
            DB::table('projetos_aviario')->where('id', $obra->id)->update(['uuid' => Str::uuid()]);
        });

        Schema::table('projetos_aviario', function (Blueprint $table) {
            $table->string('uuid', 36)->unique()->change();
        });
    }

    public function down(): void
    {
        Schema::table('projetos_aviario', function (Blueprint $table) {
            $table->dropColumn('uuid');
        });
    }
};
