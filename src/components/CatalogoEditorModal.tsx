import { useState, useEffect } from 'react';
import { atualizarObra } from '../services/api';
import { Obra } from '../context/ObraContext';

interface ItemCatalogo {
  id: string;
  descricao: string;
  unidade: string;
  precoUnitario: number;
  fatorPerda: number;
}

const CATALOGO_PADRAO: ItemCatalogo[] = [
  { id: 'cimento', descricao: 'Cimento CP-II (saco 50kg)', unidade: 'sacos', precoUnitario: 42.0, fatorPerda: 1.0 },
  { id: 'areia', descricao: 'Areia Média', unidade: 'm³', precoUnitario: 120.0, fatorPerda: 1.0 },
  { id: 'brita', descricao: 'Brita 1', unidade: 'm³', precoUnitario: 150.0, fatorPerda: 1.0 },
  { id: 'bloco9x19x19', descricao: 'Bloco Cerâmico 9x19x19', unidade: 'un', precoUnitario: 1.8, fatorPerda: 1.05 },
  { id: 'tela', descricao: 'Tela Galvanizada (m)', unidade: 'm', precoUnitario: 18.0, fatorPerda: 1.1 },
  { id: 'ninho', descricao: 'Ninho 30x35cm', unidade: 'un', precoUnitario: 85.0, fatorPerda: 1.0 },
  { id: 'poleiro', descricao: 'Poleiro 5x5cm (m)', unidade: 'm', precoUnitario: 12.0, fatorPerda: 1.0 },
];

interface Props {
  obra: Obra;
  onClose: () => void;
  onSaved: (obra: Obra) => void;
}

export default function CatalogoEditorModal({ obra, onClose, onSaved }: Props) {
  const [itens, setItens] = useState<ItemCatalogo[]>([]);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const salvo = obra.orcamento_calculado_json?.catalogo;
    if (Array.isArray(salvo) && salvo.length) {
      setItens(salvo);
    } else {
      setItens(CATALOGO_PADRAO);
    }
  }, [obra]);

  const updateItem = (idx: number, field: keyof ItemCatalogo, value: any) => {
    setItens((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
  };

  const salvar = async () => {
    setSalvando(true);
    setErro(null);
    try {
      const payload = { ...obra, orcamento_calculado_json: { ...(obra.orcamento_calculado_json || {}), catalogo: itens } };
      const res = await atualizarObra(obra.id, payload);
      onSaved(res);
      onClose();
    } catch (e: any) {
      setErro(e?.message || 'Erro ao salvar catálogo');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="modal d-block" tabIndex={-1} role="dialog" style={{ background: 'rgba(0,0,0,0.6)' }}>
      <div className="modal-dialog modal-lg modal-dialog-scrollable" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="fa-solid fa-tags me-2"></i>
              Catálogo Regional de Preços — {obra.nome_obra}
            </h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Fechar"></button>
          </div>
          <div className="modal-body">
            {erro && <div className="alert alert-danger">{erro}</div>}
            <p className="text-muted small">
              Ajuste os preços unitários e fatores de perda conforme a praça comercial da obra. Os valores são persistidos na Obra.
            </p>
            <table className="table table-sm table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Insumo</th>
                  <th>Unidade</th>
                  <th className="text-end">Preço Unit. (R$)</th>
                  <th className="text-end">Fator Perda</th>
                </tr>
              </thead>
              <tbody>
                {itens.map((it, idx) => (
                  <tr key={it.id}>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={it.descricao}
                        onChange={(e) => updateItem(idx, 'descricao', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={it.unidade}
                        onChange={(e) => updateItem(idx, 'unidade', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control form-control-sm text-end"
                        value={it.precoUnitario}
                        onChange={(e) => updateItem(idx, 'precoUnitario', parseFloat(e.target.value) || 0)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control form-control-sm text-end"
                        value={it.fatorPerda}
                        onChange={(e) => updateItem(idx, 'fatorPerda', parseFloat(e.target.value) || 1)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className="btn btn-primary" onClick={salvar} disabled={salvando}>
              {salvando ? 'Salvando...' : 'Salvar Catálogo'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}