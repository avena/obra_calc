import React, { useState } from 'react';

interface BlocoTipo {
  nome: string;
  valor: number;
}

const RENDIMENTO_BLOCOS: Record<string, BlocoTipo> = {
  '25': { nome: '9x19x19', valor: 25 },
  '16.7': { nome: '9x19x29', valor: 16.7 },
  '12.5': { nome: '9x19x39', valor: 12.5 },
};

export default function Alvenaria() {
  const [comp, setComp] = useState('5');
  const [alt, setAlt] = useState('3');
  const [porta, setPorta] = useState('1.68');
  const [janela, setJanela] = useState('0');
  const [tipo, setTipo] = useState('25');
  const [resultado, setResultado] = useState<string | null>(null);

  function calcular() {
    const c = parseFloat(comp) || 0;
    const a = parseFloat(alt) || 0;
    const p = parseFloat(porta) || 0;
    const j = parseFloat(janela) || 0;
    const rend = parseFloat(tipo) || 25;
    const areaTotal = c * a;
    const areaLiquida = Math.max(0, areaTotal - p - j);
    const blocos = Math.ceil(areaLiquida * rend);
    const blocosComPerda = Math.ceil(blocos * 1.05);
    setResultado(`${blocosComPerda} blocos`);
  }

  return (
    <section className="tab-pane fade" id="alvenaria" role="tabpanel">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">
            <i className="fa-solid fa-wall-brick text-primary me-2"></i>
            Quantidade de Blocos
          </h5>
          <div className="row g-3 mb-4">
            <div className="col-md-3">
              <label className="form-label small">Comprimento da Parede (m)</label>
              <input
                type="number"
                className="form-control"
                value={comp}
                step="0.1"
                onChange={(e) => setComp(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small">Altura da Parede (m)</label>
              <input
                type="number"
                className="form-control"
                value={alt}
                step="0.1"
                onChange={(e) => setAlt(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small">Área de Portas (m²)</label>
              <input
                type="number"
                className="form-control"
                value={porta}
                step="0.1"
                onChange={(e) => setPorta(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small">Área de Janelas (m²)</label>
              <input
                type="number"
                className="form-control"
                value={janela}
                step="0.1"
                onChange={(e) => setJanela(e.target.value)}
              />
            </div>
          </div>
          <div className="row g-3 mb-4">
            <div className="col-md-3">
              <label className="form-label small">Tipo de Bloco</label>
              <select
                className="form-select"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              >
                {Object.entries(RENDIMENTO_BLOCOS).map(([key, bloco]) => (
                  <option key={key} value={key}>
                    {bloco.nome} ({bloco.valor} un/m²)
                  </option>
                ))}
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
          <div className="text-muted small">
            <i className="fa-solid fa-circle-info me-1"></i>
            *Já incluso 5% de folga para perdas. Regra de ouro: sempre desconte portas e janelas da área total.
          </div>
        </div>
      </div>
    </section>
  );
}
