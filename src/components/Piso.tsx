import { useState } from 'react';

export default function Piso() {
  const [area, setArea] = useState('20');
  const [larg, setLarg] = useState('80');
  const [comp, setComp] = useState('80');
  const [perda, setPerda] = useState('10');
  const [resultado, setResultado] = useState<string | null>(null);

  function calcular() {
    const a = parseFloat(area) || 0;
    const l = parseFloat(larg) || 1;
    const c = parseFloat(comp) || 1;
    const p = parseFloat(perda) || 0;
    const areaPeca = (l * c) / 10000;
    if (areaPeca === 0) return;
    let qtd = a / areaPeca;
    let qtdArred = Math.ceil(qtd);
    let qtdFinal = Math.ceil(qtdArred * (1 + p / 100));
    setResultado(`${qtdFinal} peças (${qtd.toFixed(2)} exatas)`);
  }

  return (
    <section className="tab-pane fade show active" id="piso" role="tabpanel">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">
            <i className="fa-solid fa-floor-tile text-primary me-2"></i>
            Quantidade de Pisos
          </h5>
          <div className="row g-3 mb-4">
            <div className="col-md-3">
              <label className="form-label small">Área do Ambiente (m²)</label>
              <input
                type="number"
                className="form-control"
                value={area}
                step="0.1"
                onChange={(e) => setArea(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small">Largura da Peça (cm)</label>
              <input
                type="number"
                className="form-control"
                value={larg}
                step="1"
                onChange={(e) => setLarg(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small">Comprimento da Peça (cm)</label>
              <input
                type="number"
                className="form-control"
                value={comp}
                step="1"
                onChange={(e) => setComp(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small">Perda (%)</label>
              <select
                className="form-select"
                value={perda}
                onChange={(e) => setPerda(e.target.value)}
              >
                <option value="5">Reta (+5%)</option>
                <option value="10">Reta (+10%)</option>
                <option value="15">Diagonal/Recortes (+15%)</option>
              </select>
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
        </div>
      </div>
    </section>
  );
}
