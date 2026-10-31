import React, { useState, useEffect } from 'react';
import { listarObras, criarObra, atualizarObra, deletarObraApi, listarCalculosDaObra } from '../services/api';
import ToastNotification from './ToastNotification';
import { useObra, Obra } from '../context/ObraContext';

export default function ObrasManager() {
  const { obraAtiva, setObraAtiva } = useObra();
  const [obras, setObras] = useState<Obra[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [busca, setBusca] = useState('');
  const [editando, setEditando] = useState<Obra | null>(null);
  const [calculosModal, setCalculosModal] = useState<{ obra: Obra; calculos: any[] } | null>(null);
  const [loadingCalculos, setLoadingCalculos] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'danger' }>({
    show: false,
    message: '',
    type: 'success',
  });

  const [form, setForm] = useState({
    nome_obra: '',
    normativa_id: 1,
    template_planta: '7x4_5_fases',
    finalidade: 'postura',
    perfil_clima: 'meio_norte',
    qtd_aves: 100,
    comprimento_m: 7,
    largura_m: 4,
    pe_direito_m: 2.8,
    altura_cumeeira_m: 3.5,
    altura_mureta_m: 0.6,
    tipo_piso: 'concreto',
    tipo_cobertura: 'telha_fibrocimento',
    tipo_fechamento_base: 'mureta_tela',
  });

  useEffect(() => {
    carregarObras();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowForm(false);
        setEditando(null);
        setCalculosModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  function showToast(message: string, type: 'success' | 'danger' = 'success') {
    setToast({ show: true, message, type });
  }

  async function carregarObras() {
    setLoading(true);
    try {
      const data = await listarObras();
      setObras(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (editando) {
        await atualizarObra(editando.id, form);
        showToast('Obra atualizada com sucesso!', 'success');
      } else {
        await criarObra(form);
        showToast('Obra criada com sucesso!', 'success');
      }
      setShowForm(false);
      setEditando(null);
      carregarObras();
    } catch (e) {
      showToast('Erro ao salvar obra', 'danger');
      console.error(e);
    }
  }

  function iniciarEdicao(obra: Obra) {
    setEditando(obra);
    setForm({
      nome_obra: obra.nome_obra,
      normativa_id: obra.normativa_id || 1,
      template_planta: obra.template_planta || '7x4_5_fases',
      finalidade: obra.finalidade || 'postura',
      perfil_clima: obra.perfil_clima || 'meio_norte',
      qtd_aves: obra.qtd_aves || 100,
      comprimento_m: Number(obra.comprimento_m) || 7,
      largura_m: Number(obra.largura_m) || 4,
      pe_direito_m: Number(obra.pe_direito_m) || 2.8,
      altura_cumeeira_m: Number(obra.altura_cumeeira_m) || 3.5,
      altura_mureta_m: Number(obra.altura_mureta_m) || 0.6,
      tipo_piso: obra.tipo_piso || 'concreto',
      tipo_cobertura: obra.tipo_cobertura || 'telha_fibrocimento',
      tipo_fechamento_base: obra.tipo_fechamento_base || 'mureta_tela',
    });
    setShowForm(true);
  }

  async function verCalculos(obra: Obra) {
    setLoadingCalculos(true);
    setCalculosModal({ obra, calculos: [] });
    try {
      const data = await listarCalculosDaObra(obra.id);
      setCalculosModal({ obra, calculos: Array.isArray(data) ? data : [] });
    } catch (e) {
      showToast('Erro ao carregar cálculos', 'danger');
      console.error(e);
    } finally {
      setLoadingCalculos(false);
    }
  }

  async function deletarObra(id: number) {
    if (!confirm('Tem certeza que deseja deletar esta obra?')) return;
    try {
      await deletarObraApi(id);
      showToast('Obra deletada com sucesso!', 'success');
      if (obraAtiva?.id === id) {
        setObraAtiva(null);
      }
      carregarObras();
    } catch (e) {
      showToast('Erro ao deletar obra', 'danger');
      console.error(e);
    }
  }

  function novaObra() {
    setEditando(null);
    setForm({
      nome_obra: '',
      normativa_id: 1,
      template_planta: '7x4_5_fases',
      finalidade: 'postura',
      perfil_clima: 'meio_norte',
      qtd_aves: 100,
      comprimento_m: 7,
      largura_m: 4,
      pe_direito_m: 2.8,
      altura_cumeeira_m: 3.5,
      altura_mureta_m: 0.6,
      tipo_piso: 'concreto',
      tipo_cobertura: 'telha_fibrocimento',
      tipo_fechamento_base: 'mureta_tela',
    });
    setShowForm(true);
  }

  const obrasFiltradas = obras.filter((o) =>
    (o.nome_obra || '').toLowerCase().includes(busca.trim().toLowerCase())
  );
  const totalArea = obras.reduce(
    (acc, o) => acc + (Number(o.comprimento_m) || 0) * (Number(o.largura_m) || 0),
    0
  );
  const totalAves = obras.reduce((acc, o) => acc + (Number(o.qtd_aves) || 0), 0);
  const totalOrcamento = totalArea > 0 ? totalArea * 1800 : 0; // CUB médio referência

  return (
    <section className="tab-pane fade show active">
      <ToastNotification
        message={toast.message}
        type={toast.type}
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
      />
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title mb-0">
              <i className="fa-solid fa-building text-primary me-2"></i>
              Gerenciar Obras
            </h5>
            <button className="btn btn-primary" onClick={novaObra}>
              <i className="fa-solid fa-plus me-2"></i>
              Nova Obra
            </button>
          </div>

          {/* Modal Nova / Editar Obra */}
          {showForm && (
            <div
              className="modal show d-block"
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modalObraTitle"
            >
              <div className="modal-dialog modal-lg modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="modalObraTitle">
                      {editando ? 'Editar Obra' : 'Nova Obra'}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => {
                        setShowForm(false);
                        setEditando(null);
                      }}
                      aria-label="Close"
                    ></button>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Nome da Obra *</label>
                          <input
                            className="form-control"
                            value={form.nome_obra}
                            onChange={(e) => setForm({ ...form, nome_obra: e.target.value })}
                            required
                          />
                        </div>
                        <div className="col-md-3">
                          <label className="form-label">Quantidade de Aves *</label>
                          <input
                            type="number"
                            className="form-control"
                            value={form.qtd_aves}
                            onChange={(e) => setForm({ ...form, qtd_aves: Number(e.target.value) })}
                            required
                          />
                        </div>
                        <div className="col-md-3">
                          <label className="form-label">Normativa ID</label>
                          <input
                            type="number"
                            className="form-control"
                            value={form.normativa_id}
                            onChange={(e) => setForm({ ...form, normativa_id: Number(e.target.value) })}
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Template</label>
                          <select
                            className="form-select"
                            value={form.template_planta}
                            onChange={(e) => setForm({ ...form, template_planta: e.target.value })}
                          >
                            <option value="7x4_5_fases">7x4 5 Fases</option>
                            <option value="3x3_modulo">Módulo 3x3</option>
                          </select>
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Finalidade</label>
                          <select
                            className="form-select"
                            value={form.finalidade}
                            onChange={(e) => setForm({ ...form, finalidade: e.target.value })}
                          >
                            <option value="postura">Postura</option>
                            <option value="corte">Corte</option>
                            <option value="cria_recria">Cria/Recria</option>
                          </select>
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Perfil Clima</label>
                          <select
                            className="form-select"
                            value={form.perfil_clima}
                            onChange={(e) => setForm({ ...form, perfil_clima: e.target.value })}
                          >
                            <option value="meio_norte">Meio-Norte</option>
                            <option value="semiarido">Semiárido</option>
                            <option value="tropical">Tropical</option>
                          </select>
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Comprimento (m)</label>
                          <input
                            type="number"
                            step="0.01"
                            className="form-control"
                            value={form.comprimento_m}
                            onChange={(e) => setForm({ ...form, comprimento_m: Number(e.target.value) })}
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Largura (m)</label>
                          <input
                            type="number"
                            step="0.01"
                            className="form-control"
                            value={form.largura_m}
                            onChange={(e) => setForm({ ...form, largura_m: Number(e.target.value) })}
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Pé-direito (m)</label>
                          <input
                            type="number"
                            step="0.01"
                            className="form-control"
                            value={form.pe_direito_m}
                            onChange={(e) => setForm({ ...form, pe_direito_m: Number(e.target.value) })}
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Altura Cumeeira (m)</label>
                          <input
                            type="number"
                            step="0.01"
                            className="form-control"
                            value={form.altura_cumeeira_m}
                            onChange={(e) => setForm({ ...form, altura_cumeeira_m: Number(e.target.value) })}
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Altura Mureta (m)</label>
                          <input
                            type="number"
                            step="0.01"
                            className="form-control"
                            value={form.altura_mureta_m}
                            onChange={(e) => setForm({ ...form, altura_mureta_m: Number(e.target.value) })}
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Tipo de Piso</label>
                          <select
                            className="form-select"
                            value={form.tipo_piso}
                            onChange={(e) => setForm({ ...form, tipo_piso: e.target.value })}
                          >
                            <option value="concreto">Concreto</option>
                            <option value="terra">Terra</option>
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Tipo de Cobertura</label>
                          <select
                            className="form-select"
                            value={form.tipo_cobertura}
                            onChange={(e) => setForm({ ...form, tipo_cobertura: e.target.value })}
                          >
                            <option value="telha_fibrocimento">Telha Fibrocimento</option>
                            <option value="telha_ceramica">Telha Cerâmica</option>
                            <option value="palha">Palha</option>
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Fechamento Base</label>
                          <select
                            className="form-select"
                            value={form.tipo_fechamento_base}
                            onChange={(e) => setForm({ ...form, tipo_fechamento_base: e.target.value })}
                          >
                            <option value="mureta_tela">Mureta + Tela</option>
                            <option value="mureta_alvenaria">Mureta Alvenaria</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          setShowForm(false);
                          setEditando(null);
                        }}
                      >
                        Cancelar
                      </button>
                      <button type="submit" className="btn btn-primary">
                        {editando ? 'Atualizar' : 'Salvar'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div
                className="modal-backdrop show"
                onClick={() => {
                  setShowForm(false);
                  setEditando(null);
                }}
              ></div>
            </div>
          )}

          {/* Modal Cálculos da Obra */}
          {calculosModal && (
            <div
              className="modal show d-block"
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modalCalculosTitle"
            >
              <div className="modal-dialog modal-lg modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="modalCalculosTitle">
                      <i className="fa-solid fa-calculator text-primary me-2"></i>
                      Cálculos de: {calculosModal.obra.nome_obra}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setCalculosModal(null)}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="d-none d-print-block mb-3 border-bottom pb-2">
                      <h4 className="mb-1">Relatório Orçamentário — {calculosModal.obra.nome_obra}</h4>
                      <p className="small mb-1">
                        <strong>Dimensões:</strong> {calculosModal.obra.comprimento_m}m x {calculosModal.obra.largura_m}m |{' '}
                        <strong>Aves:</strong> {calculosModal.obra.qtd_aves} |{' '}
                        <strong>Finalidade:</strong> {calculosModal.obra.finalidade || 'Padrão'} |{' '}
                        <strong>Clima:</strong> {calculosModal.obra.perfil_clima || 'Padrão'}
                      </p>
                      <p className="small text-muted mb-0">
                        Gerado em: {new Date().toLocaleDateString('pt-BR')} via Calculadora de Obra
                      </p>
                    </div>
                    {loadingCalculos ? (
                      <p className="text-muted text-center py-4">Carregando cálculos...</p>
                    ) : calculosModal.calculos.length === 0 ? (
                      <div className="text-center py-4 text-muted">
                        <i className="fa-solid fa-circle-question fa-2x mb-2 text-secondary"></i>
                        <p>Nenhum cálculo salvo nesta obra ainda.</p>
                        <small>Acesse as abas de cálculo acima para dimensionar insumos e salvá-los aqui.</small>
                      </div>
                    ) : (
                      <div className="table-responsive">
                        <table className="table table-sm table-striped">
                          <thead>
                            <tr>
                              <th>Tipo</th>
                              <th>Parâmetros</th>
                              <th>Resultado</th>
                              <th>Data</th>
                            </tr>
                          </thead>
                          <tbody>
                            {calculosModal.calculos.map((c, i) => (
                              <tr key={c.id || i}>
                                <td>
                                  <span className="badge bg-secondary text-uppercase">{c.tipo}</span>
                                </td>
                                <td>
                                  <pre className="mb-0 small text-muted" style={{ whiteSpace: 'pre-wrap', maxHeight: '100px' }}>
                                    {typeof c.parametros === 'object'
                                      ? JSON.stringify(c.parametros, null, 1)
                                      : String(c.parametros)}
                                  </pre>
                                </td>
                                <td>
                                  <pre className="mb-0 small text-warning" style={{ whiteSpace: 'pre-wrap', maxHeight: '100px' }}>
                                    {typeof c.resultado === 'object'
                                      ? JSON.stringify(c.resultado, null, 1)
                                      : String(c.resultado)}
                                  </pre>
                                </td>
                                <td className="small text-muted">
                                  {c.created_at ? new Date(c.created_at).toLocaleDateString() : '-'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => window.print()}
                      disabled={calculosModal.calculos.length === 0}
                    >
                      <i className="fa-solid fa-print me-1"></i> Imprimir Relatório / PDF
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => setCalculosModal(null)}>
                      Fechar
                    </button>
                  </div>
                </div>
              </div>
              <div className="modal-backdrop show" onClick={() => setCalculosModal(null)}></div>
            </div>
          )}

          {/* Cards de Métricas */}
          <div className="row g-3 mb-3">
            <div className="col-md-3">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <div className="text-muted small">Total de Projetos</div>
                  <div className="readout-tile mt-2">{obras.length}</div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <div className="text-muted small">Área Total</div>
                  <div className="readout-tile mt-2">{totalArea.toFixed(2)} m²</div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <div className="text-muted small">Orçamento Estimado</div>
                  <div className="readout-tile mt-2">
                    {totalOrcamento > 0 ? `R$ ${totalOrcamento.toLocaleString('pt-BR')}` : 'R$ 0'}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <div className="text-muted small">Capacidade de Aves</div>
                  <div className="readout-tile mt-2">{totalAves}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <input
              type="search"
              className="form-control"
              placeholder="Buscar obra por nome..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              aria-label="Buscar obra por nome"
            />
          </div>

          {loading ? (
            <p className="text-muted">Carregando...</p>
          ) : obras.length === 0 ? (
            <p className="text-muted">Nenhuma obra cadastrada. Crie a primeira obra acima.</p>
          ) : obrasFiltradas.length === 0 ? (
            <p className="text-muted">Nenhuma obra encontrada.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped align-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Nome</th>
                    <th>Template</th>
                    <th>Aves</th>
                    <th>Dimensões</th>
                    <th>Finalidade</th>
                    <th>Data</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {obrasFiltradas.map((obra) => {
                    const isAtiva = obraAtiva?.id === obra.id;
                    return (
                      <tr key={obra.id} className={isAtiva ? 'table-active' : ''}>
                        <td>{obra.id}</td>
                        <td>
                          {isAtiva ? (
                            <span className="badge bg-warning text-dark">
                              <i className="fa-solid fa-check me-1"></i>Ativa
                            </span>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary py-0 px-2"
                              onClick={() => setObraAtiva(obra)}
                              title="Tornar esta a obra ativa"
                            >
                              Ativar
                            </button>
                          )}
                        </td>
                        <td>
                          <strong>{obra.nome_obra}</strong>
                        </td>
                        <td>{obra.template_planta}</td>
                        <td>{obra.qtd_aves}</td>
                        <td>
                          {obra.comprimento_m} x {obra.largura_m} m
                        </td>
                        <td>{obra.finalidade}</td>
                        <td>{obra.created_at ? new Date(obra.created_at).toLocaleDateString() : '-'}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-info me-1"
                            onClick={() => verCalculos(obra)}
                            title="Ver cálculos da obra"
                          >
                            <i className="fa-solid fa-calculator"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary me-1"
                            onClick={() => iniciarEdicao(obra)}
                            title="Editar"
                          >
                            <i className="fa-solid fa-pen"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => deletarObra(obra.id)}
                            title="Deletar"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
