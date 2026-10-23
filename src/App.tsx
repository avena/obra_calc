import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface BlocoTipo {
  nome: string;
  valor: number;
}

const RENDIMENTO_BLOCOS: Record<string, BlocoTipo> = {
  '25': { nome: '9x19x19', valor: 25 },
  '16.7': { nome: '9x19x29', valor: 16.7 },
  '12.5': { nome: '9x19x39', valor: 12.5 },
};

const TABS: Record<string, string> = {
  alvenaria: 'Alvenaria',
  piso: 'Piso',
  argamassa: 'Argamassa',
  concreto: 'Concreto',
  aco: 'Aço',
};

function Alvenaria() {
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

function Piso() {
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
    <section className="tab-pane fade" id="piso" role="tabpanel">
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

function Argamassa() {
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

function Concreto() {
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

function Aco() {
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
    <section className="tab-pane fade" id="aco" role="tabpanel">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">
            <i className="fa-solid fa-weight-hanging text-primary me-2"></i>
            Aço (Peso e Quantidade)
          </h5>
          <div className="row g-3 mb-4">
            <div className="col-md-3">
              <label className="form-label small">Diâmetro da Barra (mm)</label>
              <input
                type="number"
                className="form-control"
                value={diam}
                step="1"
                onChange={(e) => setDiam(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small">Comprimento Total (m)</label>
              <input
                type="number"
                className="form-control"
                value={comp}
                step="0.1"
                onChange={(e) => setComp(e.target.value)}
              />
            </div>
          </div>
          <button className="btn btn-primary mb-3" onClick={calcular}>
            <i className="fa-solid fa-calculator me-2"></i>Calcular
          </button>
          {peso && (
            <div className="alert alert-success">
              <strong>Peso Estimado:</strong> {peso}
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
                <input
                  type="number"
                  className="form-control"
                  value={esp}
                  step="1"
                  onChange={(e) => setEsp(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label small">Comprimento da Laje (m)</label>
                <input
                  type="number"
                  className="form-control"
                  value={laje}
                  step="0.1"
                  onChange={(e) => setLaje(e.target.value)}
                />
              </div>
            </div>
            {barras && (
              <div className="alert alert-info">
                <strong>Barras Necessárias:</strong> {barras}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('alvenaria');

  const paneles: Record<string, React.ReactNode> = {
    alvenaria: <Alvenaria />,
    piso: <Piso />,
    argamassa: <Argamassa />,
    concreto: <Concreto />,
    aco: <Aco />,
  };

  return (
    <div className="container py-4">
      <header className="mb-4 text-center">
        <h1>
          <i className="fa-solid fa-calculator text-primary me-2"></i>
          Calculadora de Obra
        </h1>
        <p className="text-muted">
          Blocos • Pisos • Argamassa • Concreto • Aço
        </p>
      </header>

      <nav className="mb-4">
        <div className="nav nav-tabs" id="calcTabs" role="tablist">
          {(['alvenaria', 'piso', 'argamassa', 'concreto', 'aco'] as const).map(
            (tab) => (
              <button
                key={tab}
                type="button"
                className={`nav-link ${activeTab === tab ? 'active' : ''}`}
                role="tab"
                onClick={() => setActiveTab(tab)}
              >
                {TABS[tab]}
              </button>
            )
          )}
        </div>
      </nav>

      <div className="tab-content">{paneles[activeTab]}</div>

      <footer className="mt-5 text-muted text-center small">
        Calculadora de Obra - baseada nas fórmulas do primeiro-prompt.txt
      </footer>
    </div>
  );
}