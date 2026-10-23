import { useState } from 'react';

interface GalinheiroInputs {
  comprimento: string;
  largura: string;
  galinhasPorMetroQuadrado: string;
}

interface GalinheiroResult {
  areaTotal: number;
  areaPostura: number;
  areaPernoite: number;
  areaPasto: number;
  totalGalinhas: number;
  madeiraM: number;
  tijoloUnidades: number;
}

const AREA_POSTURA_PCT = 0.30; // 30% da área para postura (ovos)
const AREA_PERNOITE_PCT = 0.40; // 40% da área para pernoite (noite)
const AREA_PASTO_PCT = 0.30; // 30% da área para pasto

// Madeira: perímetro do galinheiro (estrutura de suporte)
function calcularMadeira(comprimento: number, largura: number): number {
  return 2 * (comprimento + largura); // metros lineares de madeira
}

// Tijolo: 1 tijolo por 0,01 m² de parede (estimativa simplificada)
function calcularTijolo(comprimento: number, largura: number, altura: number = 2.0): number {
  const areaParede = 2 * (comprimento + largura) * altura;
  return Math.ceil(areaParede / 0.01); // tijolos
}

export default function Galinheiro() {
  const [inputs, setInputs] = useState<GalinheiroInputs>({
    comprimento: '5',
    largura: '4',
    galinhasPorMetroQuadrado: '3',
  });
  const [resultado, setResultado] = useState<GalinheiroResult | null>(null);

  function calcular() {
    const c = parseFloat(inputs.comprimento) || 0;
    const l = parseFloat(inputs.largura) || 0;
    const gmpq = parseFloat(inputs.galinhasPorMetroQuadrado) || 0;

    if (c <= 0 || l <= 0) {
      setResultado(null);
      return;
    }

    const areaTotal = c * l;
    const areaPostura = areaTotal * AREA_POSTURA_PCT;
    const areaPernoite = areaTotal * AREA_PERNOITE_PCT;
    const areaPasto = areaTotal * AREA_PASTO_PCT;
    const totalGalinhas = Math.floor(areaTotal * gmpq);
    const madeiraM = calcularMadeira(c, l);
    const tijoloUnidades = calcularTijolo(c, l);

    setResultado({
      areaTotal,
      areaPostura,
      areaPernoite,
      areaPasto,
      totalGalinhas,
      madeiraM,
      tijoloUnidades,
    });
  }

  return (
    <section className="tab-pane fade show active" id="galinheiro" role="tabpanel">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">
            <i className="fa-solid fa-chicken text-primary me-2"></i>
            Galinheiro — Área e Insumos
          </h5>
          <p className="text-muted small mb-4">
            Calcula área total, zonas (postura, pernoite, pasto), número de galinhas,
            madeira e tijolos necessários. Baseado na literatura de galinhas por m².
          </p>
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <label htmlFor="galinheiro-comprimento" className="form-label small">
                Comprimento (m)
              </label>
              <input
                id="galinheiro-comprimento"
                type="number"
                className="form-control"
                value={inputs.comprimento}
                step="0.1"
                onChange={(e) => setInputs({ ...inputs, comprimento: e.target.value })}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="galinheiro-largura" className="form-label small">
                Largura (m)
              </label>
              <input
                id="galinheiro-largura"
                type="number"
                className="form-control"
                value={inputs.largura}
                step="0.1"
                onChange={(e) => setInputs({ ...inputs, largura: e.target.value })}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="galinheiro-galinhas-por-m2" className="form-label small">
                Galinhas por m²
              </label>
              <input
                id="galinheiro-galinhas-por-m2"
                type="number"
                className="form-control"
                value={inputs.galinhasPorMetroQuadrado}
                step="0.1"
                onChange={(e) => setInputs({ ...inputs, galinhasPorMetroQuadrado: e.target.value })}
              />
            </div>
          </div>
          <button className="btn btn-primary mb-3" onClick={calcular}>
            <i className="fa-solid fa-calculator me-2"></i>Calcular
          </button>
          {resultado && (
            <>
              <div className="alert alert-success mb-3" role="alert">
                <strong>Resultado:</strong>
                <ul className="mb-0 mt-2">
                  <li>Área total: <strong>{resultado.areaTotal.toFixed(2)} m²</strong></li>
                  <li>
                    Área de postura (ovos): <strong>{resultado.areaPostura.toFixed(2)} m²</strong> (30%)
                  </li>
                  <li>
                    Área de pernoite (noite): <strong>{resultado.areaPernoite.toFixed(2)} m²</strong> (40%)
                  </li>
                  <li>
                    Área de pasto: <strong>{resultado.areaPasto.toFixed(2)} m²</strong> (30%)
                  </li>
                  <li>Total de galinhas: <strong>{resultado.totalGalinhas}</strong></li>
                  <li>Madeira necessária: <strong>{resultado.madeiraM.toFixed(2)} m</strong> (perímetro)</li>
                  <li>Tijolos necessários: <strong>{resultado.tijoloUnidades}</strong> (estimativa)</li>
                </ul>
              </div>
              <div className="text-muted small">
                <i className="fa-solid fa-chicken me-1"></i>
                Referência: literatura indica entre 3 e 5 galinhas por m² em sistemas de cria.
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}