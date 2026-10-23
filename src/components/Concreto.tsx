import React, { useState } from 'react';

export default function Concreto() {
  const [comp, setComp] = useState('5');
  const [larg, setLarg] = useState('0.8');
  const [alt, setAlt] = useState('0.3');
  const [resultado, setResultado] = useState<string | null>(null);

  function calcular() {
    const c = parseFloat(comp) || 0;
    const l = parseFloat(larg) || 0;
    const a = parseFloat(alt) || 0;
    const volume = c * l * a;
    setResultado(`${volume.toFixed(3)} m³`);
  }

  return (
    <section className="tab-pane fade" id="concreto" role="tabpanel">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">
            <i className="fa-solid fa-cone text-primary me-2"></i>
            Volume de Concreto
          </h5>
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <label className="form-label small">Comprimento (m)</label>
              <input
                type="number"
                className="form-control"
                value={comp}
                step="0.1"
                onChange={(e) => setComp(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small">Largura (m)</label>
              <input
                type="number"
                className="form-control"
                value={larg}
                step="0.1"
                onChange={(e) => setLarg(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small">Altura/Espessura (m)</label>
              <input
                type="number"
                className="form-control"
                value={alt}
                step="0.1"
                onChange={(e) => setAlt(e.target.value)}
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
            Volume = Comprimento × Largura × Altura. Peso próprio ≈ 25 kN/m³.
          </div>
        </div>
      </div>
    </section>
  );
}
