import { useState } from 'react';
import SalvarCalculoBtn from './SalvarCalculoBtn';

const CIMENTO_KG_M3: Record<number, number> = {
  20: 280,
  25: 320,
  30: 360,
};

export default function Concreto() {
  const [comp, setComp] = useState('5');
  const [larg, setLarg] = useState('0.8');
  const [alt, setAlt] = useState('0.3');
  const [fck, setFck] = useState('25');
  const [resultado, setResultado] = useState<string | null>(null);
  const [breakdown, setBreakdown] = useState<{
    sacos: number;
    areia: number;
    brita: number;
  } | null>(null);

  function calcular() {
    const c = parseFloat(comp) || 0;
    const l = parseFloat(larg) || 0;
    const a = parseFloat(alt) || 0;
    const volume = c * l * a;
    const resistencia = parseInt(fck, 10) || 25;
    const cimentoKg = volume * (CIMENTO_KG_M3[resistencia] || 320);
    const sacos = Math.ceil(cimentoKg / 50);
    const areia = volume * 0.45;
    const brita = volume * 0.85;
    setResultado(`${volume.toFixed(3)} m³`);
    setBreakdown({ sacos, areia, brita });
  }

  return (
    <section className="tab-pane fade show active" id="concreto" role="tabpanel">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">
            <i className="fa-solid fa-cone text-primary me-2"></i>
            Volume de Concreto
          </h5>
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <label className="form-label small">Comprimento (m)</label>
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
            <div className="col-md-4">
              <label className="form-label small">Largura (m)</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  value={larg}
                  step="0.1"
                  onChange={(e) => setLarg(e.target.value)}
                />
                <span className="input-group-text">m</span>
              </div>
            </div>
            <div className="col-md-4">
              <label className="form-label small">Altura/Espessura (m)</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  value={alt}
                  step="0.1"
                  onChange={(e) => setAlt(e.target.value)}
                />
                <span className="input-group-text">m</span>
              </div>
            </div>
            <div className="col-md-4">
              <label className="form-label small">Resistência (MPa)</label>
              <select
                className="form-select"
                value={fck}
                onChange={(e) => setFck(e.target.value)}
              >
                <option value="20">20 MPa</option>
                <option value="25">25 MPa</option>
                <option value="30">30 MPa</option>
              </select>
            </div>
          </div>
          <button className="btn btn-primary mb-3" onClick={calcular}>
            <i className="fa-solid fa-calculator me-2"></i>Calcular
          </button>
          {resultado && (
            <div className="readout-tile mb-3">
              <div className="alert alert-success mb-0">
                <strong>Volume:</strong> {resultado}
              </div>
              <SalvarCalculoBtn
                tipo="concreto"
                parametros={{ comp, larg, alt, fck }}
                resultado={{ volume: resultado, breakdown }}
              />
            </div>
          )}
          {breakdown && (
            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="text-muted small">Sacos de Cimento (50kg)</div>
                    <div className="readout-tile mt-2">{breakdown.sacos}</div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="text-muted small">Areia (m³)</div>
                    <div className="readout-tile mt-2">{breakdown.areia.toFixed(3)}</div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="text-muted small">Brita/Agregado (m³)</div>
                    <div className="readout-tile mt-2">{breakdown.brita.toFixed(3)}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="text-muted small">
            <i className="fa-solid fa-circle-info me-1"></i>
            Volume = Comprimento × Largura × Altura. Peso próprio ≈ 25 kN/m³.
          </div>
        </div>
      </div>
    </section>
  );
}
