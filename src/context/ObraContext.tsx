import React, { createContext, useContext, useState, useEffect } from 'react';
import { listarObras, salvarCalculoNaObra } from '../services/api';

export interface Obra {
  id: number;
  nome_obra: string;
  normativa_id?: number;
  template_planta?: string;
  finalidade?: string;
  perfil_clima?: string;
  qtd_aves?: number;
  comprimento_m?: number;
  largura_m?: number;
  orcamento_calculado_json?: any;
  [key: string]: any;
}

export interface ItemFilaSync {
  obraId: number;
  tipo: string;
  parametros: any;
  resultado: any;
  timestamp: number;
}

export interface ObraContextType {
  obras: Obra[];
  obraAtiva: Obra | null;
  setObraAtiva: (obra: Obra | null) => void;
  carregarObras: () => Promise<void>;
  salvarCalculo: (tipo: string, parametros: any, resultado: any) => Promise<boolean>;
  pendentesSync: number;
  sincronizarFila: () => Promise<{ sincronizados: number; erros: number }>;
}

const defaultContext: ObraContextType = {
  obras: [],
  obraAtiva: null,
  setObraAtiva: () => {},
  carregarObras: async () => {},
  salvarCalculo: async () => false,
  pendentesSync: 0,
  sincronizarFila: async () => ({ sincronizados: 0, erros: 0 }),
};

export const ObraContext = createContext<ObraContextType>(defaultContext);
export const useObra = () => useContext(ObraContext);

export function ObraProvider({ children }: { children: React.ReactNode }) {
  const [obras, setObras] = useState<Obra[]>([]);
  const [obraAtiva, setObraAtivaState] = useState<Obra | null>(null);
  const [pendentesSync, setPendentesSync] = useState<number>(() => {
    try {
      const fila = JSON.parse(localStorage.getItem('obra_calc_fila_offline') || '[]');
      return Array.isArray(fila) ? fila.length : 0;
    } catch {
      return 0;
    }
  });

  const carregarObras = async () => {
    try {
      const data = await listarObras();
      const lista = Array.isArray(data) ? data : [];
      setObras(lista);

      const salvoId = localStorage.getItem('obra_ativa_id');
      if (salvoId && lista.length > 0) {
        const encontrada = lista.find((o) => o.id === Number(salvoId));
        if (encontrada) setObraAtivaState(encontrada);
      }
    } catch {
      // ponytail: falhas de rede ignoradas silenciosamente; upgrade com retry se houver sync em lote
    }
  };

  useEffect(() => {
    carregarObras();
  }, []);

  const setObraAtiva = (obra: Obra | null) => {
    setObraAtivaState(obra);
    if (obra) {
      localStorage.setItem('obra_ativa_id', String(obra.id));
    } else {
      localStorage.removeItem('obra_ativa_id');
    }
  };

  const salvarCalculo = async (tipo: string, parametros: any, resultado: any): Promise<boolean> => {
    if (!obraAtiva) return false;
    try {
      await salvarCalculoNaObra(obraAtiva.id, tipo, parametros, resultado);
      return true;
    } catch {
      // ponytail: fila offline simples em localStorage; upgrade para IndexedDB se volume de calculos exceder 5MB
      try {
        const fila: ItemFilaSync[] = JSON.parse(localStorage.getItem('obra_calc_fila_offline') || '[]');
        fila.push({ obraId: obraAtiva.id, tipo, parametros, resultado, timestamp: Date.now() });
        localStorage.setItem('obra_calc_fila_offline', JSON.stringify(fila));
        setPendentesSync(fila.length);
        return true;
      } catch {
        return false;
      }
    }
  };

  const sincronizarFila = async () => {
    let fila: ItemFilaSync[] = [];
    try {
      fila = JSON.parse(localStorage.getItem('obra_calc_fila_offline') || '[]');
    } catch {
      fila = [];
    }

    if (fila.length === 0) return { sincronizados: 0, erros: 0 };

    const restantes: ItemFilaSync[] = [];
    let sincronizados = 0;

    for (const item of fila) {
      try {
        await salvarCalculoNaObra(item.obraId, item.tipo, item.parametros, item.resultado);
        sincronizados++;
      } catch {
        restantes.push(item);
      }
    }

    localStorage.setItem('obra_calc_fila_offline', JSON.stringify(restantes));
    setPendentesSync(restantes.length);
    if (sincronizados > 0) carregarObras();

    return { sincronizados, erros: restantes.length };
  };

  return (
    <ObraContext.Provider
      value={{
        obras,
        obraAtiva,
        setObraAtiva,
        carregarObras,
        salvarCalculo,
        pendentesSync,
        sincronizarFila,
      }}
    >
      {children}
    </ObraContext.Provider>
  );
}
