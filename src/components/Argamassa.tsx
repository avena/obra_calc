import React, { useState } from 'react';

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
    <section className="tab-pane fade" id="argamassa" role="tabpanel">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">
            <i className="fa-solid fa-boxes text-primary me-2"></i>
            Reboco e Argamassa
          </h5>
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <label className="form-label small">Área da Parede (m²)</label>
              <input
                type="number"
                className="form-control"
                value={area}
                step="0.1"
                onChange={(e) => setArea(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small">Espessura (cm)</label>
              <input
                type="number"
                className="form-control"
                value={esp}
                step="0.1"
                onChange={(e) => setEsp(e.target.value)}
              />
            </div>
          </div>
          <button className="btn btn-primary mb-3" onClick={calcular}>
            <i className="fa-solid fa-calculator me-2"></i>Calcular
          </button>
          {resultado && (
            <div className="alert alert-success">
              <strong>Resultado:</strong> {resultado}
            </div>
          )}
          <div className="text-muted small">
            <i className="fa-solid fa-circle-info me-1"></i>
            Volume = Área × Espessura. 1 m³ ≈ 56 latas de 18L.
          </div>
        </div>
      </div>
    </section>
  );
}
