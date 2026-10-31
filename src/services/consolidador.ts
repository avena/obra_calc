// Motor de consolidação de insumos de uma Obra.
// Módulo puro TypeScript, sem dependências de DOM.

export interface InsumoConsolidado {
  categoria: 'alvenaria' | 'concreto' | 'argamassa' | 'piso' | 'aco' | 'avicultura';
  item: string;
  unidade: 'sacos' | 'm³' | 'un' | 'kg' | 'barras' | 'm';
  quantidade: number;
  fontes: string[];
}

export interface CalculoSalvo {
  id?: number;
  tipo: string;
  parametros?: Record<string, any>;
  resultado?: Record<string, any>;
}

function addInsumo(map: Map<string, InsumoConsolidado>, key: string, insumo: InsumoConsolidado) {
  const existing = map.get(key);
  if (existing) {
    existing.quantidade += insumo.quantidade;
    if (insumo.fontes.length) {
      existing.fontes = Array.from(new Set([...existing.fontes, ...insumo.fontes]));
    }
  } else {
    map.set(key, { ...insumo, fontes: [...insumo.fontes] });
  }
}

export function consolidarInsumos(calculos: CalculoSalvo[]): InsumoConsolidado[] {
  const map = new Map<string, InsumoConsolidado>();

  for (const c of calculos || []) {
    const r = c.resultado || {};
    const tipo = (c.tipo || '').toLowerCase();

    switch (tipo) {
      case 'alvenaria': {
        const qtd = Number(r.blocosComPerda ?? r.blocos ?? 0);
        if (qtd > 0) {
          addInsumo(map, 'blocos-alvenaria', {
            categoria: 'alvenaria',
            item: 'Blocos Cerâmicos/Concreto',
            unidade: 'un',
            quantidade: qtd,
            fontes: ['Alvenaria'],
          });
        }
        break;
      }
      case 'piso': {
        const cimento = Number(r.cimento ?? r.sacosCimento ?? 0);
        const areia = Number(r.areia ?? r.areiaM3 ?? 0);
        if (cimento > 0) {
          addInsumo(map, 'cimento-piso', {
            categoria: 'piso',
            item: 'Cimento CP-II (sacos 50kg)',
            unidade: 'sacos',
            quantidade: cimento,
            fontes: ['Piso'],
          });
        }
        if (areia > 0) {
          addInsumo(map, 'areia-piso', {
            categoria: 'piso',
            item: 'Areia Média',
            unidade: 'm³',
            quantidade: areia,
            fontes: ['Piso'],
          });
        }
        break;
      }
      case 'argamassa': {
        const cimento = Number(r.cimento ?? r.sacosCimento ?? 0);
        const areia = Number(r.areia ?? r.areiaM3 ?? 0);
        if (cimento > 0) {
          addInsumo(map, 'cimento-argamassa', {
            categoria: 'argamassa',
            item: 'Cimento CP-II (sacos 50kg)',
            unidade: 'sacos',
            quantidade: cimento,
            fontes: ['Argamassa'],
          });
        }
        if (areia > 0) {
          addInsumo(map, 'areia-argamassa', {
            categoria: 'argamassa',
            item: 'Areia Média',
            unidade: 'm³',
            quantidade: areia,
            fontes: ['Argamassa'],
          });
        }
        break;
      }
      case 'concreto': {
        const cimento = Number(r.cimento ?? r.sacosCimento ?? 0);
        const areia = Number(r.areia ?? r.areiaM3 ?? 0);
        const brita = Number(r.brita ?? r.britaM3 ?? 0);
        if (cimento > 0) {
          addInsumo(map, 'cimento-concreto', {
            categoria: 'concreto',
            item: 'Cimento CP-II (sacos 50kg)',
            unidade: 'sacos',
            quantidade: cimento,
            fontes: ['Concreto'],
          });
        }
        if (areia > 0) {
          addInsumo(map, 'areia-concreto', {
            categoria: 'concreto',
            item: 'Areia Grossa',
            unidade: 'm³',
            quantidade: areia,
            fontes: ['Concreto'],
          });
        }
        if (brita > 0) {
          addInsumo(map, 'brita-concreto', {
            categoria: 'concreto',
            item: 'Brita 1 (m³)',
            unidade: 'm³',
            quantidade: brita,
            fontes: ['Concreto'],
          });
        }
        break;
      }
      case 'aco': {
        const qtd = Number(r.quantidade ?? r.kg ?? 0);
        const bitola = r.bitola ?? r.diametro ?? '';
        if (qtd > 0) {
          addInsumo(map, `aco-${bitola}`, {
            categoria: 'aco',
            item: `Aço CA-50 Ø${bitola}mm`,
            unidade: 'kg',
            quantidade: qtd,
            fontes: ['Aço'],
          });
        }
        break;
      }
      case 'galinheiro': {
        const blocos = Number(r.blocos ?? 0);
        if (blocos > 0) {
          addInsumo(map, 'blocos-galinheiro', {
            categoria: 'avicultura',
            item: 'Blocos Cerâmicos/Concreto',
            unidade: 'un',
            quantidade: blocos,
            fontes: ['Galinheiro'],
          });
        }
        break;
      }
      case 'aviario_planta': {
        const blocos = Number(r.blocos9x19x19Un ?? 0);
        const tela = Number(r.telaGalvanizadaM ?? 0);
        const contrapiso = Number(r.contrapisoM3 ?? 0);
        const ninhos = Number(r.ninhosUn ?? 0);
        const poleiros = Number(r.poleirosM ?? 0);
        const perimetro = Number(r.perimetroMuretaLiquidaM ?? 0);

        if (blocos > 0) {
          addInsumo(map, 'blocos-aviario', {
            categoria: 'avicultura',
            item: 'Blocos Cerâmicos 9x19x19',
            unidade: 'un',
            quantidade: blocos,
            fontes: ['Aviário Planta'],
          });
        }
        if (tela > 0) {
          addInsumo(map, 'tela-aviario', {
            categoria: 'avicultura',
            item: 'Tela Galvanizada (m)',
            unidade: 'm',
            quantidade: tela,
            fontes: ['Aviário Planta'],
          });
        }
        if (contrapiso > 0) {
          addInsumo(map, 'contrapiso-aviario', {
            categoria: 'avicultura',
            item: 'Contrapiso Alvenaria (m³)',
            unidade: 'm³',
            quantidade: contrapiso,
            fontes: ['Aviário Planta'],
          });
        }
        if (ninhos > 0) {
          addInsumo(map, 'ninhos-aviario', {
            categoria: 'avicultura',
            item: 'Ninhos 30x35cm (un)',
            unidade: 'un',
            quantidade: ninhos,
            fontes: ['Aviário Planta'],
          });
        }
        if (poleiros > 0) {
          addInsumo(map, 'poleiros-aviario', {
            categoria: 'avicultura',
            item: 'Poleiros 5x5cm (m)',
            unidade: 'm',
            quantidade: poleiros,
            fontes: ['Aviário Planta'],
          });
        }
        if (perimetro > 0) {
          addInsumo(map, 'perimetro-aviario', {
            categoria: 'avicultura',
            item: 'Perímetro Mureta (m)',
            unidade: 'm',
            quantidade: perimetro,
            fontes: ['Aviário Planta'],
          });
        }
        break;
      }
      default:
        break;
    }
  }

  // Agrupar cimento de todas as fontes em uma única linha consolidada
  const cimentoKeys = Array.from(map.keys()).filter((k) => k.startsWith('cimento-'));
  if (cimentoKeys.length > 1) {
    let totalCimento = 0;
    const fontesCimento: string[] = [];
    for (const k of cimentoKeys) {
      const v = map.get(k)!;
      totalCimento += v.quantidade;
      fontesCimento.push(...v.fontes);
      map.delete(k);
    }
    addInsumo(map, 'cimento-total', {
      categoria: 'concreto',
      item: 'Cimento CP-II (sacos 50kg) — TOTAL',
      unidade: 'sacos',
      quantidade: totalCimento,
      fontes: Array.from(new Set(fontesCimento)),
    });
  }

  // Agrupar areia de todas as fontes
  const areiaKeys = Array.from(map.keys()).filter((k) => k.startsWith('areia-'));
  if (areiaKeys.length > 1) {
    let totalAreia = 0;
    const fontesAreia: string[] = [];
    for (const k of areiaKeys) {
      const v = map.get(k)!;
      totalAreia += v.quantidade;
      fontesAreia.push(...v.fontes);
      map.delete(k);
    }
    addInsumo(map, 'areia-total', {
      categoria: 'concreto',
      item: 'Areia (m³) — TOTAL',
      unidade: 'm³',
      quantidade: totalAreia,
      fontes: Array.from(new Set(fontesAreia)),
    });
  }

  // Agrupar blocos de todas as fontes
  const blocoKeys = Array.from(map.keys()).filter((k) => k.startsWith('blocos-'));
  if (blocoKeys.length > 1) {
    let totalBlocos = 0;
    const fontesBlocos: string[] = [];
    for (const k of blocoKeys) {
      const v = map.get(k)!;
      totalBlocos += v.quantidade;
      fontesBlocos.push(...v.fontes);
      map.delete(k);
    }
    addInsumo(map, 'blocos-total', {
      categoria: 'alvenaria',
      item: 'Blocos Cerâmicos/Concreto — TOTAL',
      unidade: 'un',
      quantidade: totalBlocos,
      fontes: Array.from(new Set(fontesBlocos)),
    });
  }

  return Array.from(map.values()).sort((a, b) => a.categoria.localeCompare(b.categoria) || a.item.localeCompare(b.item));
}