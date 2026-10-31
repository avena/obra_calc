import { useState } from 'react';
import { useObra } from '../context/ObraContext';

interface Props {
  tipo: string;
  parametros: Record<string, any>;
  resultado: any;
}

export default function SalvarCalculoBtn({ tipo, parametros, resultado }: Props) {
  const { obraAtiva, salvarCalculo } = useObra();
  const [status, setStatus] = useState<'idle' | 'salvando' | 'salvo' | 'erro'>('idle');

  if (!resultado) return null;

  const handleSalvar = async () => {
    if (!obraAtiva || status === 'salvando') return;
    setStatus('salvando');
    const ok = await salvarCalculo(tipo, parametros, resultado);
    setStatus(ok ? 'salvo' : 'erro');
    setTimeout(() => setStatus('idle'), 3500);
  };

  if (!obraAtiva) {
    return (
      <div className="mt-2 text-muted small">
        <i className="fa-solid fa-circle-info me-1"></i>
        Selecione uma obra ativa no cabeçalho para vincular este cálculo.
      </div>
    );
  }

  return (
    <div className="mt-2 d-flex align-items-center gap-2">
      <button
        type="button"
        className="btn btn-sm btn-outline-success"
        onClick={handleSalvar}
        disabled={status === 'salvando'}
      >
        <i className={`fa-solid ${status === 'salvando' ? 'fa-spinner fa-spin' : 'fa-floppy-disk'} me-1`}></i>
        {status === 'salvando' ? 'Salvando...' : `Salvar Cálculo nesta Obra (${obraAtiva.nome_obra})`}
      </button>
      {status === 'salvo' && (
        <span className="badge bg-success">
          <i className="fa-solid fa-check me-1"></i>Salvo com sucesso!
        </span>
      )}
      {status === 'erro' && <span className="badge bg-danger">Erro ao salvar cálculo</span>}
    </div>
  );
}
