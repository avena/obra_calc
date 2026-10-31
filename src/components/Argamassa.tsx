import { useState } from 'react';
import SalvarCalculoBtn from './SalvarCalculoBtn';

const TRACOS = [
  { nome: 'Traço 1:3', consumo: 420 },
  { nome: 'Traço 1:4', consumo: 320 },
  { nome: 'Traço 1:6', consumo: 220 },
];

export default function Argamassa() {
  const [area, setArea] = useState('100');
  const [esp, setEsp] = useState('2');
  const [resultado, setResultado] = useState<string | null>(null);

  function calcular() {
    const a = parseFloat(area) || 0;
    const e = parseFloat(esp) || 0;
    const volume = a * (e / 100);
    const latas = volume * 56;
    setResultado(`${volume.toFixed(2)} m³ (≈ ${Math.ceil(latas)} latas de 18L)`);
  }

  return (
    <section className="tab-pane fade show active" id="argamassa" role="tabpanel">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">
            <i className="fa-solid fa-boxes text-primary me-2"></i>
            Reboco e Argamassa
          </h5>
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <label className="form-label small">Área da Parede (m²)</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  value={area}
                  step="0.1"
                  onChange={(e) => setArea(e.target.value)}
                />
                <span className="input-group-text">m²</span>
              </div>
            </div>
            <div className="col-md-4">
              <label className="form-label small">Espessura (cm)</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  value={esp}
                  step="0.1"
                  onChange={(e) => setEsp(e.target.value)}
                />
                <span className="input-group-text">cm</span>
              </div>
            </div>
          </div>
          <button className="btn btn-primary mb-3" onClick={calcular}>
            <i className="fa-solid fa-calculator me-2"></i>Calcular
          </button>
          {resultado && (
            <div className="readout-tile mb-3">
              <div className="alert alert-success mb-0">
                <strong>Resultado:</strong> {resultado}
              </div>
              <SalvarCalculoBtn
                tipo="argamassa"
                parametros={{ area, esp }}
                resultado={{ resultado }}
              />
            </div>
          )}

          <div className="row g-3 mb-3">
            {TRACOS.map((t) => (
              <div className="col-md-4" key={t.nome}>
                <div className="card shadow-sm h-100">
                  <div className="card-body text-center">
                    <h6 className="card-title mb-2">{t.nome}</h6>
                    <div className="readout-tile">{t.consumo} kg/m³</div>
                    <div className="text-muted small mt-2">Consumo de cimento</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-muted small">
            <i className="fa-solid fa-circle-info me-1"></i>
            Volume = Área × Espessura. 1 m³ ≈ 56 latas de 18L.
          </div>
        </div>
      </div>
    </section>
  );
}
