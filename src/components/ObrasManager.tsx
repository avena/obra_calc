import { useState, useEffect } from 'react';
import { listarObras, criarObra } from '../services/api';
import ToastNotification from './ToastNotification';

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8084/api';

interface Obra {
  id: number;
  nome_obra: string;
  normativa_id: number;
  template_planta: string;
  finalidade: string;
  perfil_clima: string;
  qtd_aves: number;
  comprimento_m: number;
  largura_m: number;
  pe_direito_m: number;
  altura_cumeeira_m: number;
  altura_mureta_m: number;
  tipo_piso: string;
  tipo_cobertura: string;
  tipo_fechamento_base: string;
  created_at?: string;
}

export default function ObrasManager() {
  const [obras, setObras] = useState<Obra[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editando, setEditando] = useState<Obra | null>(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' as 'success' | 'danger' });
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
        await fetch(`${API_BASE_URL}/obras/${editando.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
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
      normativa_id: obra.normativa_id,
      template_planta: obra.template_planta,
      finalidade: obra.finalidade,
      perfil_clima: obra.perfil_clima,
      qtd_aves: obra.qtd_aves,
      comprimento_m: Number(obra.comprimento_m),
      largura_m: Number(obra.largura_m),
      pe_direito_m: Number(obra.pe_direito_m),
      altura_cumeeira_m: Number(obra.altura_cumeeira_m),
      altura_mureta_m: Number(obra.altura_mureta_m),
      tipo_piso: obra.tipo_piso,
      tipo_cobertura: obra.tipo_cobertura,
      tipo_fechamento_base: obra.tipo_fechamento_base,
    });
    setShowForm(true);
  }

  async function deletarObra(id: number) {
    if (!confirm('Tem certeza que deseja deletar esta obra?')) return;
    try {
      await fetch(`${API_BASE_URL}/obras/${id}`, { method: 'DELETE' });
      showToast('Obra deletada com sucesso!', 'success');
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
    setShowForm(!showForm);
  }

  return (
    <section className="tab-pane fade show active">
      <ToastNotification message={toast.message} type={toast.type} show={toast.show} onClose={() => setToast({...toast, show: false})} />
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title mb-0">
              <i className="fa-solid fa-building text-primary me-2"></i>
              Gerenciar Obras
            </h5>
            <button className="btn btn-primary" onClick={novaObra}>
              <i className="fa-solid fa-plus me-2"></i>
              {showForm && !editando ? 'Fechar' : 'Nova Obra'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="border rounded p-3 mb-3 bg-light">
              <h6 className="mb-3">{editando ? 'Editar Obra' : 'Nova Obra'}</h6>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Nome da Obra *</label>
                  <input className="form-control" value={form.nome_obra} onChange={e => setForm({...form, nome_obra: e.target.value})} required />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Quantidade de Aves *</label>
                  <input type="number" className="form-control" value={form.qtd_aves} onChange={e => setForm({...form, qtd_aves: Number(e.target.value)})} required />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Template</label>
                  <select className="form-select" value={form.template_planta} onChange={e => setForm({...form, template_planta: e.target.value})}>
                    <option value="7x4_5_fases">7x4 5 Fases</option>
                    <option value="3x3_modulo">Módulo 3x3</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Comprimento (m)</label>
                  <input type="number" step="0.01" className="form-control" value={form.comprimento_m} onChange={e => setForm({...form, comprimento_m: Number(e.target.value)})} />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Largura (m)</label>
                  <input type="number" step="0.01" className="form-control" value={form.largura_m} onChange={e => setForm({...form, largura_m: Number(e.target.value)})} />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Finalidade</label>
                  <select className="form-select" value={form.finalidade} onChange={e => setForm({...form, finalidade: e.target.value})}>
                    <option value="postura">Postura</option>
                    <option value="corte">Corte</option>
                    <option value="cria_recria">Cria/Recria</option>
                  </select>
                </div>
              </div>
              <div className="mt-3">
                <button type="submit" className="btn btn-success me-2">{editando ? 'Atualizar' : 'Salvar'}</button>
                <button type="button" className="btn btn-secondary" onClick={() => { setShowForm(false); setEditando(null); }}>Cancelar</button>
              </div>
            </form>
          )}

          {loading ? (
            <p className="text-muted">Carregando...</p>
          ) : obras.length === 0 ? (
            <p className="text-muted">Nenhuma obra cadastrada. Crie a primeira obra acima.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
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
                  {obras.map(obra => (
                    <tr key={obra.id}>
                      <td>{obra.id}</td>
                      <td>{obra.nome_obra}</td>
                      <td>{obra.template_planta}</td>
                      <td>{obra.qtd_aves}</td>
                      <td>{obra.comprimento_m} x {obra.largura_m} m</td>
                      <td>{obra.finalidade}</td>
                      <td>{obra.created_at ? new Date(obra.created_at).toLocaleDateString() : '-'}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-1" onClick={() => iniciarEdicao(obra)} title="Editar">
                          <i className="fa-solid fa-pen"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => deletarObra(obra.id)} title="Deletar">
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
