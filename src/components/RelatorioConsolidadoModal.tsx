import { useEffect, useState } from 'react';
import { listarCalculosDaObra } from '../services/api';
import { consolidarInsumos, InsumoConsolidado } from '../services/consolidador';
import { Obra } from '../context/ObraContext';

interface Props {
  obra: Obra;
  onClose: () => void;
}

export default function RelatorioConsolidadoModal({ obra, onClose }: Props) {
  const [loading, setLoading] = useState(true);
  const [insumos, setInsumos] = useState<InsumoConsolidado[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;
    (async () => {
      try {
        const data = await listarCalculosDaObra(obra.id);
        const lista = Array.isArray(data) ? data : data?.data || [];
        if (!cancelado) {
          setInsumos(consolidarInsumos(lista));
        }
      } catch (e: any) {
        if (!cancelado) setErro(e?.message || 'Erro ao carregar cálculos');
      } finally {
        if (!cancelado) setLoading(false);
      }
    })();
    return () => {
      cancelado = true;
    };
  }, [obra.id]);

  const imprimir = () => {
    window.print();
  };

  const totalPorCategoria = insumos.reduce<Record<string, number>>((acc, i) => {
    acc[i.categoria] = (acc[i.categoria] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="modal d-block" tabIndex={-1} role="dialog" style={{ background: 'rgba(0,0,0,0.6)' }}>
      <div className="modal-dialog modal-xl modal-dialog-scrollable" role="document">
        <div className="modal-content">
          <div className="modal-header no-print">
            <h5 className="modal-title">
              <i className="fa-solid fa-file-invoice me-2"></i>
              Relatório Orçamentário Consolidado — {obra.nome_obra}
            </h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Fechar"></button>
          </div>
          <div className="modal-body" id="relatorio-consolidado">
            <style>{`
              @media print {
                .no-print { display: none !important; }
                body { background: #fff !important; color: #000 !important; }
                .modal { position: static !important; background: transparent !important; }
                .modal-dialog { max-width: 100% !important; margin: 0 !important; }
                .modal-content { border: none !important; box-shadow: none !important; }
                table { page-break-inside: auto; }
                tr { page-break-inside: avoid; page-break-after: auto; }
                .page-break { page-break-before: always; }
              }
            `}</style>

            <header className="text-center mb-4">
              <h2 className="fw-bold">RELATÓRIO ORÇAMENTÁRIO CONSOLIDADO</h2>
              <p className="text-muted mb-1">Obra: <strong>{obra.nome_obra}</strong></p>
              <p className="text-muted mb-1">
                Finalidade: {obra.finalidade || '—'} · Template: {obra.template_planta || '—'} · Aves: {obra.qtd_aves ?? '—'}
              </p>
              <p className="text-muted small">
                Gerado em: {new Date().toLocaleString('pt-BR')} · Calculadora de Obra — Embrapa Meio-Norte
              </p>
            </header>

            {loading && (
              <div className="text-center py-5">
                <div className="spinner-border" role="status"></div>
                <p className="mt-2 text-muted">Carregando cálculos da obra...</p>
              </div>
            )}

            {erro && <div className="alert alert-danger">{erro}</div>}

            {!loading && !erro && insumos.length === 0 && (
              <div className="alert alert-warning">
                Nenhum cálculo vinculado a esta obra. Salve cálculos nas abas de calculadoras para consolidar.
              </div>
            )}

            {!loading && !erro && insumos.length > 0 && (
              <>
                <h5 className="fw-bold mt-3">1. Insumos Consolidados</h5>
                <table className="table table-bordered table-sm">
                  <thead className="table-dark">
                    <tr>
                      <th>Categoria</th>
                      <th>Item</th>
                      <th className="text-end">Quantidade</th>
                      <th>Unidade</th>
                      <th>Fontes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {insumos.map((i, idx) => (
                      <tr key={idx}>
                        <td className="text-capitalize">{i.categoria}</td>
                        <td>{i.item}</td>
                        <td className="text-end fw-bold">{i.quantidade.toLocaleString('pt-BR', { maximumFractionDigits: 3 })}</td>
                        <td>{i.unidade}</td>
                        <td className="small text-muted">{i.fontes.join(', ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <h5 className="fw-bold mt-4">2. Resumo por Categoria</h5>
                <ul className="list-group list-group-flush">
                  {Object.entries(totalPorCategoria).map(([cat, n]) => (
                    <li key={cat} className="list-group-item d-flex justify-content-between">
                      <span className="text-capitalize">{cat}</span>
                      <span className="badge bg-secondary">{n} item(ns)</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 small text-muted">
                  <p>
                    <strong>Observação:</strong> Quantidades já incluem fatores de perda conforme cadastrado em cada calculadora
                    (ex: +5% blocos, +10% tela/contrapiso). Preços unitários e orçamento financeiro podem ser parametrizados
                    no Catálogo Regional de Materiais.
                  </p>
                </div>
              </>
            )}
          </div>
          <div className="modal-footer no-print">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Fechar
            </button>
            <button type="button" className="btn btn-primary" onClick={imprimir}>
              <i className="fa-solid fa-print me-2"></i>
              Imprimir / Salvar PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}