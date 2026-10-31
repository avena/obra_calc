import { useState } from 'react';
import SalvarCalculoBtn from './SalvarCalculoBtn';

export default function Aco() {
  const [diam, setDiam] = useState('10');
  const [comp, setComp] = useState('12');
  const [peso, setPeso] = useState<string | null>(null);
  const [esp, setEsp] = useState('20');
  const [laje, setLaje] = useState('1');
  const [barras, setBarras] = useState<string | null>(null);

  function calcular() {
    const d = parseFloat(diam) || 0;
    const c = parseFloat(comp) || 0;
    const pesoM = (d * d) / 162;
    const pesoTotal = pesoM * c;
    setPeso(`${pesoTotal.toFixed(2)} kg (${pesoM.toFixed(3)} kg/m)`);
    const e = parseFloat(esp) || 20;
    const l = parseFloat(laje) || 1;
    const qtdBarras = Math.ceil(l / (e / 100)) + 1;
    setBarras(`${qtdBarras} barras`);
  }

  return (
    <section className="tab-pane fade show active" id="aco" role="tabpanel">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">
            <i className="fa-solid fa-weight-hanging text-primary me-2"></i>
            Aço (Peso e Quantidade)
          </h5>
          <div className="row g-3 mb-4">
            <div className="col-md-3">
              <label className="form-label small">Diâmetro da Barra (mm)</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  value={diam}
                  step="1"
                  onChange={(e) => setDiam(e.target.value)}
                />
                <span className="input-group-text">mm</span>
              </div>
            </div>
            <div className="col-md-3">
              <label className="form-label small">Comprimento Total (m)</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  value={comp}
                  step="0.1"
                  onChange={(e) => setComp(e.target.value)}
                />
                <span className="input-group-text">m</span>
              </div>
            </div>
          </div>
          <button className="btn btn-primary mb-3" onClick={calcular}>
            <i className="fa-solid fa-calculator me-2"></i>Calcular
          </button>
          {peso && (
            <div className="readout-tile mb-3">
              <div className="alert alert-success mb-0">
                <strong>Peso Estimado:</strong> {peso}
              </div>
              <SalvarCalculoBtn
                tipo="aco"
                parametros={{ diam, comp, esp, laje }}
                resultado={{ peso, barras }}
              />
            </div>
          )}
          <div className="mt-4 pt-4 border-top">
            <h6 className="mb-3">
              <i className="fa-solid fa-lightbulb me-2"></i>
              Macete: Quantas barras para uma laje de 1m?
            </h6>
            <div className="row g-3 mb-3">
              <div className="col-md-3">
                <label className="form-label small">Espaçamento (cm)</label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    value={esp}
                    step="1"
                    onChange={(e) => setEsp(e.target.value)}
                  />
                  <span className="input-group-text">cm</span>
                </div>
              </div>
              <div className="col-md-3">
                <label className="form-label small">Comprimento da Laje (m)</label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    value={laje}
                    step="0.1"
                    onChange={(e) => setLaje(e.target.value)}
                  />
                  <span className="input-group-text">m</span>
                </div>
              </div>
            </div>
            {barras && (
              <div className="readout-tile mb-3">
                <div className="alert alert-info mb-0">
                  <strong>Barras Necessárias:</strong> {barras}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
