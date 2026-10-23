import { useState } from 'react';

export type TemplatePlanta = 'PLANTA_7X4_5FASES' | 'MODULO_3X3_POEDEIRAS';

interface CompartimentoInfo {
  id: string;
  nome: string;
  dimensoes: string;
  areaM2: number;
  finalidade: string;
  detalhesConstrutivos: string;
  corPreenchimento: string;
  alertaTecnico?: string;
}

const COMPARTIMENTOS_7X4: Record<string, CompartimentoInfo> = {
  incubacao: {
    id: 'incubacao',
    nome: 'Incubação (Choco)',
    dimensoes: '1,5 m × 1,5 m',
    areaM2: 2.25,
    finalidade: 'Isolamento de galinhas chocas e nascimento dos pintinhos.',
    detalhesConstrutivos: 'Divisória interna com mureta de alvenaria (0,40m) + tela até o teto. Porta interna de 0,80m.',
    corPreenchimento: '#fef3c7',
  },
  postura: {
    id: 'postura',
    nome: 'Reprodução / Postura',
    dimensoes: '1,5 m × 2,5 m',
    areaM2: 3.75,
    finalidade: 'Alojamento de matrizes/poedeiras (densidade: 1,6 m² para cada 10 aves).',
    detalhesConstrutivos: 'Ninhos (30x35cm) instalados junto à mureta com coleta externa. Poleiros de 5x5cm arredondados.',
    corPreenchimento: '#dcfce7',
  },
  terminacao: {
    id: 'terminacao',
    nome: 'Terminação (Engorda)',
    dimensoes: '4,0 m × 4,0 m',
    areaM2: 16.0,
    finalidade: 'Área principal para aves em fase final de abate (1,6 m² para cada 10 aves) e acesso ao piquete.',
    detalhesConstrutivos: 'Linha de cumeeira central (h = 2,50m) orientada Leste-Oeste. Porta externa para o piquete.',
    corPreenchimento: '#e0f2fe',
  },
  cria: {
    id: 'cria',
    nome: 'Cria (Pintinhos)',
    dimensoes: '1,5 m × 1,5 m',
    areaM2: 2.25,
    finalidade: 'Fase inicial com aquecimento (lenha, elétrico ou gás) e proteção contra vento com cortinas.',
    detalhesConstrutivos: 'Protegido por cortinas externas. Porta independente de manejo.',
    corPreenchimento: '#fce7f3',
    alertaTecnico: 'Atenção: O folheto Embrapa cita "30 cm²/10 aves" por erro tipográfico. Utilizar parâmetro corrigido (0,30 m²/10 aves).',
  },
  recria: {
    id: 'recria',
    nome: 'Recria (Frangos em Crescimento)',
    dimensoes: '1,5 m × 2,5 m',
    areaM2: 3.75,
    finalidade: 'Transição entre pinteiro e engorda/postura.',
    detalhesConstrutivos: 'Divisória em mureta e tela galvanizada. Porta independente de manejo.',
    corPreenchimento: '#f3e8ff',
    alertaTecnico: 'Atenção: O folheto Embrapa cita "50 cm²/10 aves" por erro tipográfico. Utilizar parâmetro corrigido (0,50 m²/10 aves).',
  },
};

export default function AviarioPlantaSVG() {
  const [template, setTemplate] = useState<TemplatePlanta>('PLANTA_7X4_5FASES');
  const [compartimentoAtivo, setCompartimentoAtivo] = useState<string>('terminacao');
  const [numAves, setNumAves] = useState<number>(50);
  const [exibirNinhosPoleiros, setExibirNinhosPoleiros] = useState<boolean>(true);

  const infoSelecionada = COMPARTIMENTOS_7X4[compartimentoAtivo];

  const ninhosRecomendados = Math.ceil(numAves / 4);
  const poleiroLinearM = (numAves * 0.25).toFixed(1);

  return (
    <section className="tab-pane fade" id="aviario-planta" role="tabpanel">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">
            <i className="fa-solid fa-layer-group text-primary me-2"></i>
            Planta Baixa — Aviário (Embrapa Meio-Norte)
          </h5>
          <p className="text-muted small mb-4">
            Visualizador SVG da planta baixa com 5 divisórias (7,0m × 4,0m) e módulo de postura (3,0m × 3,0m).
            Baseado nas especificações técnicas da Embrapa Meio-Norte e CPT Orgânico.
          </p>

          {/* Banner de Orientação Solar Obrigatória */}
          <div className="alert alert-warning d-flex align-items-center justify-content-between mb-3 shadow-sm" role="alert">
            <div>
              <strong>☀️ Diretriz Térmica Embrapa:</strong> A linha da cumeeira deve ser obrigatoriamente alinhada no sentido{' '}
              <span className="badge bg-dark">LESTE – OESTE</span> para minimizar a insolação interna.
            </div>
            <span className="badge bg-warning text-dark border border-dark">
              Pé-direito: 2,10m | Cumeeira: 2,50m
            </span>
          </div>

          {/* Controles Superiores */}
          <div className="card shadow-sm mb-3">
            <div className="card-body d-flex flex-wrap gap-3 align-items-center justify-content-between">
              <div className="btn-group" role="group" aria-label="Seletor de Planta">
                <button
                  type="button"
                  className={`btn ${template === 'PLANTA_7X4_5FASES' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setTemplate('PLANTA_7X4_5FASES')}
                >
                  📐 Planta Corte 5 Fases (7,0m × 4,0m - 28m²)
                </button>
                <button
                  type="button"
                  className={`btn ${template === 'MODULO_3X3_POEDEIRAS' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setTemplate('MODULO_3X3_POEDEIRAS')}
                >
                  🥚 Módulo 50 Poedeiras (3,0m × 3,0m - 9m²)
                </button>
              </div>

              <div className="d-flex align-items-center gap-3">
                <div className="input-group input-group-sm" style={{ width: '190px' }}>
                  <span className="input-group-text fw-semibold">Nº Aves</span>
                  <input
                    type="number"
                    className="form-control"
                    min={10}
                    max={500}
                    value={numAves}
                    onChange={(e) => setNumAves(Math.max(1, Number(e.target.value)))}
                  />
                </div>

                <div className="form-check form-switch mb-0">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="switchEquipamentos"
                    checked={exibirNinhosPoleiros}
                    onChange={(e) => setExibirNinhosPoleiros(e.target.checked)}
                  />
                  <label className="form-check-label small" htmlFor="switchEquipamentos">
                    Exibir Ninhos / Poleiros
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-3">
            {/* Coluna do Desenho Técnico SVG */}
            <div className="col-lg-8">
              <div className="card shadow-sm h-100">
                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                  <span className="fw-bold text-secondary">
                    {template === 'PLANTA_7X4_5FASES'
                      ? 'Figura 3 — Planta Baixa de Aviário para Aves Caipiras de Corte (5 Divisórias)'
                      : 'Figura 4 — Planta Baixa e Elevação do Módulo para 50 Poedeiras (3,0m × 3,0m)'}
                  </span>
                  <small className="text-muted">Clique nos ambientes para inspecionar</small>
                </div>

                <div className="card-body d-flex justify-content-center align-items-center bg-light p-2">
                  {template === 'PLANTA_7X4_5FASES' ? (
                    <svg
                      viewBox="0 0 920 620"
                      className="w-100 h-auto border rounded bg-white"
                      style={{ maxHeight: '540px' }}
                    >
                      <defs>
                        <marker
                          id="arrow"
                          viewBox="0 0 10 10"
                          refX="5"
                          refY="5"
                          markerWidth="6"
                          markerHeight="6"
                          orient="auto-start-reverse"
                        >
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#374151" />
                        </marker>
                        <pattern
                          id="hachuraNinho"
                          width="8"
                          height="8"
                          patternTransform="rotate(45 0 0)"
                          patternUnits="userSpaceOnUse"
                        >
                          <line x1="0" y1="0" x2="0" y2="8" stroke="#b45309" strokeWidth="2" />
                        </pattern>
                      </defs>

                      {/* Projeção do Beiral do Telhado */}
                      <rect
                        x="60"
                        y="60"
                        width="800"
                        height="500"
                        fill="none"
                        stroke="#9ca3af"
                        strokeWidth="2"
                        strokeDasharray="6,6"
                      />
                      <text x="68" y="76" fontSize="11" fill="#6b7280">
                        Projeção do Beiral (0,50m)
                      </text>

                      {/* Bússola de Orientação Leste-Oeste */}
                      <g transform="translate(825, 35)">
                        <line
                          x1="-35"
                          y1="0"
                          x2="35"
                          y2="0"
                          stroke="#dc2626"
                          strokeWidth="2"
                          markerEnd="url(#arrow)"
                          markerStart="url(#arrow)"
                        />
                        <text x="-48" y="4" fontSize="11" fontWeight="bold" fill="#dc2626">
                          O
                        </text>
                        <text x="40" y="4" fontSize="11" fontWeight="bold" fill="#dc2626">
                          L
                        </text>
                      </g>

                      {/* COMPARTIMENTOS INTERATIVOS */}
                      {/* 1. INCUBAÇÃO */}
                      <g
                        onClick={() => setCompartimentoAtivo('incubacao')}
                        style={{ cursor: 'pointer' }}
                      >
                        <rect
                          x="110"
                          y="110"
                          width="150"
                          height="150"
                          fill={
                            compartimentoAtivo === 'incubacao'
                              ? '#fde68a'
                              : COMPARTIMENTOS_7X4.incubacao.corPreenchimento
                          }
                          stroke="#1f2937"
                          strokeWidth="4"
                        />
                        <text x="185" y="175" textAnchor="middle" fontWeight="bold" fontSize="13" fill="#111827">
                          INCUBAÇÃO
                        </text>
                        <text x="185" y="193" textAnchor="middle" fontSize="11" fill="#4b5563">
                          1,5m × 1,5m (2,25 m²)
                        </text>
                      </g>

                      {/* 2. POSTURA */}
                      <g
                        onClick={() => setCompartimentoAtivo('postura')}
                        style={{ cursor: 'pointer' }}
                      >
                        <rect
                          x="110"
                          y="260"
                          width="150"
                          height="250"
                          fill={
                            compartimentoAtivo === 'postura'
                              ? '#bbf7d0'
                              : COMPARTIMENTOS_7X4.postura.corPreenchimento
                          }
                          stroke="#1f2937"
                          strokeWidth="4"
                        />
                        <text x="185" y="375" textAnchor="middle" fontWeight="bold" fontSize="13" fill="#111827">
                          POSTURA
                        </text>
                        <text x="185" y="393" textAnchor="middle" fontSize="11" fill="#4b5563">
                          1,5m × 2,5m (3,75 m²)
                        </text>
                      </g>

                      {/* 3. TERMINAÇÃO */}
                      <g
                        onClick={() => setCompartimentoAtivo('terminacao')}
                        style={{ cursor: 'pointer' }}
                      >
                        <rect
                          x="260"
                          y="110"
                          width="400"
                          height="400"
                          fill={
                            compartimentoAtivo === 'terminacao'
                              ? '#bae6fd'
                              : COMPARTIMENTOS_7X4.terminacao.corPreenchimento
                          }
                          stroke="#1f2937"
                          strokeWidth="4"
                        />
                        <text x="460" y="295" textAnchor="middle" fontWeight="bold" fontSize="15" fill="#111827">
                          TERMINAÇÃO / ENGORDA
                        </text>
                        <text x="460" y="315" textAnchor="middle" fontSize="12" fill="#4b5563">
                          4,0m × 4,0m (16,00 m²)
                        </text>
                      </g>

                      {/* 4. CRIA */}
                      <g
                        onClick={() => setCompartimentoAtivo('cria')}
                        style={{ cursor: 'pointer' }}
                      >
                        <rect
                          x="660"
                          y="110"
                          width="150"
                          height="150"
                          fill={
                            compartimentoAtivo === 'cria'
                              ? '#fbcfe8'
                              : COMPARTIMENTOS_7X4.cria.corPreenchimento
                          }
                          stroke="#1f2937"
                          strokeWidth="4"
                        />
                        <text x="735" y="175" textAnchor="middle" fontWeight="bold" fontSize="13" fill="#111827">
                          CRIA
                        </text>
                        <text x="735" y="193" textAnchor="middle" fontSize="11" fill="#4b5563">
                          1,5m × 1,5m (2,25 m²)
                        </text>
                      </g>

                      {/* 5. RECRIA */}
                      <g
                        onClick={() => setCompartimentoAtivo('recria')}
                        style={{ cursor: 'pointer' }}
                      >
                        <rect
                          x="660"
                          y="260"
                          width="150"
                          height="250"
                          fill={
                            compartimentoAtivo === 'recria'
                              ? '#e9d5ff'
                              : COMPARTIMENTOS_7X4.recria.corPreenchimento
                          }
                          stroke="#1f2937"
                          strokeWidth="4"
                        />
                        <text x="735" y="375" textAnchor="middle" fontWeight="bold" fontSize="13" fill="#111827">
                          RECRIA
                        </text>
                        <text x="735" y="393" textAnchor="middle" fontSize="11" fill="#4b5563">
                          1,5m × 2,5m (3,75 m²)
                        </text>
                      </g>

                      {/* Linha de Cumeeira Central */}
                      <line
                        x1="60"
                        y1="310"
                        x2="860"
                        y2="310"
                        stroke="#dc2626"
                        strokeWidth="1.5"
                        strokeDasharray="10,5"
                      />
                      <text x="460" y="305" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="bold">
                        LINHA DE CUMEEIRA (LESTE-OESTE) — h = 2,50m
                      </text>

                      {/* Equipamentos Internos Opcionais */}
                      {exibirNinhosPoleiros && (
                        <g>
                          <rect
                            x="80"
                            y="310"
                            width="30"
                            height="140"
                            fill="url(#hachuraNinho)"
                            stroke="#92400e"
                            strokeWidth="2"
                          />
                          <text x="72" y="380" textAnchor="end" fontSize="10" fill="#92400e" fontWeight="bold">
                            Ninhos (30×35cm)
                          </text>
                          <text x="72" y="392" textAnchor="end" fontSize="9" fill="#92400e">
                            Coleta Externa
                          </text>

                          <g stroke="#78350f" strokeWidth="3">
                            <line x1="300" y1="150" x2="450" y2="150" />
                            <line x1="300" y1="175" x2="450" y2="175" />
                            <line x1="300" y1="200" x2="450" y2="200" />
                          </g>
                          <text x="375" y="140" textAnchor="middle" fontSize="10" fill="#78350f">
                            Poleiros (5×5cm a cada 25cm)
                          </text>
                        </g>
                      )}

                      {/* Representação de Portas */}
                      <path
                        d="M 140 260 L 140 220 A 40 40 0 0 1 180 260"
                        fill="none"
                        stroke="#059669"
                        strokeWidth="2"
                      />
                      <path
                        d="M 110 290 L 150 290 A 40 40 0 0 1 110 330"
                        fill="none"
                        stroke="#059669"
                        strokeWidth="2"
                      />
                      <path
                        d="M 290 510 L 290 470 A 40 40 0 0 1 330 510"
                        fill="none"
                        stroke="#059669"
                        strokeWidth="2.5"
                      />
                      <path
                        d="M 810 230 L 770 230 A 40 40 0 0 1 810 190"
                        fill="none"
                        stroke="#059669"
                        strokeWidth="2"
                      />
                      <path
                        d="M 810 290 L 770 290 A 40 40 0 0 0 810 330"
                        fill="none"
                        stroke="#059669"
                        strokeWidth="2"
                      />

                      {/* Pilares Estruturais */}
                      {[
                        [110, 110], [260, 110], [460, 110], [660, 110], [810, 110],
                        [110, 260], [260, 260], [660, 260], [810, 260],
                        [110, 510], [260, 510], [460, 510], [660, 510], [810, 510],
                      ].map(([cx, cy], idx) => (
                        <rect
                          key={idx}
                          x={cx - 5}
                          y={cy - 5}
                          width="10"
                          height="10"
                          fill="#111827"
                        />
                      ))}

                      {/* Cotas Horizontais Superiores */}
                      <g stroke="#374151" strokeWidth="1.5" markerStart="url(#arrow)" markerEnd="url(#arrow)">
                        <line x1="110" y1="40" x2="260" y2="40" />
                        <line x1="260" y1="40" x2="660" y2="40" />
                        <line x1="660" y1="40" x2="810" y2="40" />
                      </g>
                      <text x="185" y="32" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111827">
                        1,5 m
                      </text>
                      <text x="460" y="32" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111827">
                        4,0 m
                      </text>
                      <text x="735" y="32" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111827">
                        1,5 m
                      </text>

                      {/* Cotas Verticais Esquerda */}
                      <g stroke="#374151" strokeWidth="1.5" markerStart="url(#arrow)" markerEnd="url(#arrow)">
                        <line x1="40" y1="110" x2="40" y2="260" />
                        <line x1="40" y1="260" x2="40" y2="510" />
                      </g>
                      <text x="32" y="190" textAnchor="end" fontSize="12" fontWeight="bold" fill="#111827">
                        1,5 m
                      </text>
                      <text x="32" y="390" textAnchor="end" fontSize="12" fontWeight="bold" fill="#111827">
                        2,5 m
                      </text>

                      {/* Cota Total Inferior */}
                      <line
                        x1="110"
                        y1="585"
                        x2="810"
                        y2="585"
                        stroke="#111827"
                        strokeWidth="1.5"
                        markerStart="url(#arrow)"
                        markerEnd="url(#arrow)"
                      />
                      <text x="460" y="605" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111827">
                        Comprimento Total: 7,0 m (Área Total: 28,0 m²)
                      </text>
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 920 520"
                      className="w-100 h-auto border rounded bg-white"
                      style={{ maxHeight: '500px' }}
                    >
                      <defs>
                        <marker
                          id="arrow2"
                          viewBox="0 0 10 10"
                          refX="5"
                          refY="5"
                          markerWidth="6"
                          markerHeight="6"
                          orient="auto-start-reverse"
                        >
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#374151" />
                        </marker>
                      </defs>

                      {/* LADO ESQUERDO: PLANTA BAIXA 3,0m x 3,0m */}
                      <text x="230" y="40" textAnchor="middle" fontWeight="bold" fontSize="15" fill="#111827">
                        1. Planta Baixa (3,0m × 3,0m = 9,0 m²)
                      </text>

                      {/* Projeção do Beiral */}
                      <rect
                        x="60"
                        y="70"
                        width="340"
                        height="340"
                        fill="none"
                        stroke="#9ca3af"
                        strokeWidth="1.5"
                        strokeDasharray="5,5"
                      />

                      {/* Mureta Perimetral 3x3m */}
                      <rect
                        x="100"
                        y="110"
                        width="260"
                        height="260"
                        fill="#dcfce7"
                        stroke="#1f2937"
                        strokeWidth="5"
                      />

                      {/* Cumeeira Leste-Oeste */}
                      <line
                        x1="60"
                        y1="240"
                        x2="400"
                        y2="240"
                        stroke="#dc2626"
                        strokeWidth="1.5"
                        strokeDasharray="8,4"
                      />
                      <text x="230" y="232" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#dc2626">
                        CUMEEIRA LESTE-OESTE
                      </text>

                      {exibirNinhosPoleiros && (
                        <g>
                          {/* Ninhos com Abertura Externa na Mureta */}
                          <rect
                            x="74"
                            y="140"
                            width="26"
                            height="180"
                            fill="#fde68a"
                            stroke="#92400e"
                            strokeWidth="2"
                          />
                          <text x="68" y="230" textAnchor="end" fontSize="10" fontWeight="bold" fill="#92400e">
                            Ninhos Externos
                          </text>
                          <text x="68" y="242" textAnchor="end" fontSize="9" fill="#92400e">
                            (30×35cm)
                          </text>

                          {/* Poleiros Internos */}
                          <g stroke="#78350f" strokeWidth="3.5">
                            <line x1="140" y1="145" x2="320" y2="145" />
                            <line x1="140" y1="170" x2="320" y2="170" />
                            <line x1="140" y1="195" x2="320" y2="195" />
                          </g>
                          <text x="230" y="132" textAnchor="middle" fontSize="10" fill="#78350f">
                            Poleiros 5×5cm (distância 25cm)
                          </text>
                        </g>
                      )}

                      {/* Porta de Acesso 0,80m */}
                      <path
                        d="M 200 370 L 200 320 A 50 50 0 0 1 250 370"
                        fill="none"
                        stroke="#059669"
                        strokeWidth="2.5"
                      />
                      <text x="225" y="388" textAnchor="middle" fontSize="10" fill="#059669" fontWeight="bold">
                        Porta Tela
                      </text>

                      {/* Cotas da Planta 3x3 */}
                      <line
                        x1="100"
                        y1="435"
                        x2="360"
                        y2="435"
                        stroke="#111827"
                        strokeWidth="1.5"
                        markerStart="url(#arrow2)"
                        markerEnd="url(#arrow2)"
                      />
                      <text x="230" y="455" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111827">
                        3,0 m
                      </text>

                      <line
                        x1="425"
                        y1="110"
                        x2="425"
                        y2="370"
                        stroke="#111827"
                        strokeWidth="1.5"
                        markerStart="url(#arrow2)"
                        markerEnd="url(#arrow2)"
                      />
                      <text x="435" y="245" fontSize="13" fontWeight="bold" fill="#111827">
                        3,0 m
                      </text>

                      {/* LADO DIREITO: VISTA LATERAL / CORTE CONSTRUTIVO */}
                      <text x="690" y="40" textAnchor="middle" fontWeight="bold" fontSize="15" fill="#111827">
                        2. Elevação Frontal / Corte (Alturas)
                      </text>

                      {/* Telhado em 2 Águas */}
                      <polyline
                        points="530,175 690,115 850,175"
                        fill="none"
                        stroke="#b45309"
                        strokeWidth="6"
                        strokeDasharray="10,3"
                      />

                      {/* Oitão Superior Aberto/Ventilado */}
                      <polygon
                        points="560,160 690,115 820,160"
                        fill="#f3f4f6"
                        stroke="#374151"
                        strokeWidth="2"
                      />

                      {/* Área de Tela Metálica */}
                      <rect
                        x="560"
                        y="160"
                        width="260"
                        height="170"
                        fill="#e5e7eb"
                        stroke="#1f2937"
                        strokeWidth="2"
                      />
                      <g stroke="#9ca3af" strokeWidth="1">
                        {[185, 210, 235, 260, 285, 310].map((y) => (
                          <line key={y} x1="560" y1={y} x2="820" y2={y} />
                        ))}
                        {[590, 620, 650, 680, 710, 740, 770, 800].map((x) => (
                          <line key={x} x1={x} y1="160" x2={x} y2="330" />
                        ))}
                      </g>

                      {/* Porta Frontal na Vista */}
                      <rect
                        x="665"
                        y="160"
                        width="50"
                        height="170"
                        fill="none"
                        stroke="#111827"
                        strokeWidth="2.5"
                      />

                      {/* Mureta de Alvenaria na Base */}
                      <rect
                        x="560"
                        y="330"
                        width="260"
                        height="40"
                        fill="#d97706"
                        stroke="#1f2937"
                        strokeWidth="2.5"
                      />
                      <text x="690" y="355" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff">
                        Mureta Alvenaria (h = 0,40 m)
                      </text>

                      {/* Cotas de Altura */}
                      <line
                        x1="500"
                        y1="115"
                        x2="500"
                        y2="370"
                        stroke="#111827"
                        strokeWidth="1.5"
                        markerStart="url(#arrow2)"
                        markerEnd="url(#arrow2)"
                      />
                      <text x="492" y="240" textAnchor="end" fontSize="12" fontWeight="bold" fill="#111827">
                        2,50 m
                      </text>

                      <line
                        x1="535"
                        y1="160"
                        x2="535"
                        y2="370"
                        stroke="#111827"
                        strokeWidth="1.5"
                        markerStart="url(#arrow2)"
                        markerEnd="url(#arrow2)"
                      />
                      <text x="528" y="275" textAnchor="end" fontSize="12" fontWeight="bold" fill="#111827">
                        2,10 m
                      </text>

                      {/* Cota de Largura na Elevação */}
                      <line
                        x1="560"
                        y1="435"
                        x2="820"
                        y2="435"
                        stroke="#111827"
                        strokeWidth="1.5"
                        markerStart="url(#arrow2)"
                        markerEnd="url(#arrow2)"
                      />
                      <text x="690" y="455" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111827">
                        3,0 m
                      </text>
                    </svg>
                  )}
                </div>
              </div>
            </div>

            {/* Coluna de Inspeção Técnica e Quantitativos */}
            <div className="col-lg-4">
              <div className="card shadow-sm mb-3">
                <div className="card-header bg-dark text-white fw-bold">
                  🔍 Especificação do Ambiente Selecionado
                </div>
                <div className="card-body">
                  {template === 'PLANTA_7X4_5FASES' ? (
                    <>
                      <h5 className="card-title text-primary fw-bold mb-1">
                        {infoSelecionada.nome}
                      </h5>
                      <span className="badge bg-secondary mb-3">
                        Dimensões: {infoSelecionada.dimensoes} ({infoSelecionada.areaM2} m²)
                      </span>
                      <p className="small mb-2">
                        <strong>Finalidade Zootécnica:</strong> {infoSelecionada.finalidade}
                      </p>
                      <p className="small mb-2">
                        <strong>Padrão Construtivo:</strong> {infoSelecionada.detalhesConstrutivos}
                      </p>
                      {infoSelecionada.alertaTecnico && (
                        <div className="alert alert-danger py-2 px-3 small mb-0 mt-2">
                          ⚠️ {infoSelecionada.alertaTecnico}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <h5 className="card-title text-success fw-bold mb-1">
                        Módulo Padrão Poedeiras (3,0m × 3,0m)
                      </h5>
                      <span className="badge bg-secondary mb-3">
                        Área Coberta Útil: 9,0 m²
                      </span>
                      <p className="small mb-2">
                        Projetado pela Embrapa Meio-Norte para alojar até{' '}
                        <strong>56 aves adultas</strong> (1,6 m²/10 aves).
                      </p>
                      <p className="small mb-0">
                        Mureta perimetral de alvenaria com tela galvanizada até 2,10m e cobertura cerâmica ou palha com cumeeira a 2,50m.
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Resumo Rápido de Materiais e Equipamentos */}
              <div className="card shadow-sm">
                <div className="card-header bg-light fw-bold">
                  🧱 Prévia de Quantitativos
                  {template === 'PLANTA_7X4_5FASES' ? ' (Planta 7×4m)' : ' (Módulo 3×3m)'}
                </div>
                <ul className="list-group list-group-flush small">
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Perímetro Total de Mureta (ext + int):</span>
                    <strong>
                      {template === 'PLANTA_7X4_5FASES' ? '29,0 m líq.' : '11,2 m líq.'}
                    </strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Blocos 9×19×19 (h=0,40m + 5% perda):</span>
                    <strong>
                      {template === 'PLANTA_7X4_5FASES' ? '305 blocos' : '118 blocos'}
                    </strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Tela Galvanizada (h=1,70m + 10%):</span>
                    <strong>
                      {template === 'PLANTA_7X4_5FASES' ? '32,0 m lineares' : '12,5 m lineares'}
                    </strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Contrapiso Alvenaria (e=5cm + 10%):</span>
                    <strong>
                      {template === 'PLANTA_7X4_5FASES' ? '1,54 m³' : '0,50 m³'}
                    </strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between bg-light">
                    <span>Ninhos (1 p/ cada 4 aves - 30×35cm):</span>
                    <strong className="text-primary">{ninhosRecomendados} unidades</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between bg-light">
                    <span>Poleiros 5×5cm (25cm/ave):</span>
                    <strong className="text-primary">{poleiroLinearM} m lineares</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between bg-light">
                    <span>Área de Piquete (Normal / Semiárido):</span>
                    <strong>
                      {numAves * 3} m² / {numAves * 10} m²
                    </strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}