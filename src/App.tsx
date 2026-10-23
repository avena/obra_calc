import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Alvenaria from './components/Alvenaria';
import Piso from './components/Piso';
import Argamassa from './components/Argamassa';
import Concreto from './components/Concreto';
import Aco from './components/Aco';
import Galinheiro from './components/Galinheiro';
import AviarioPlantaSVG from './components/AviarioPlantaSVG';
import ObrasManager from './components/ObrasManager';
import { ping } from './services/api';

const TABS: Record<string, string> = {
  obras: 'Obras',
  alvenaria: 'Alvenaria',
  piso: 'Piso',
  argamassa: 'Argamassa',
  concreto: 'Concreto',
  aco: 'Aço',
  galinheiro: 'Galinheiro',
  aviario: 'Aviário Planta',
};

export default function App() {
  const [activeTab, setActiveTab] = useState('obras');
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);

  useEffect(() => {
    ping()
      .then((res) => setApiOnline(res?.status === 'ok'))
      .catch(() => setApiOnline(false));
  }, []);

  const paneles: Record<string, React.ReactNode> = {
    obras: <ObrasManager />,
    alvenaria: <Alvenaria />,
    piso: <Piso />,
    argamassa: <Argamassa />,
    concreto: <Concreto />,
    aco: <Aco />,
    galinheiro: <Galinheiro />,
    aviario: <AviarioPlantaSVG />,
  };

  return (
    <div className="container-fluid py-4 px-lg-5" style={{ maxWidth: "1500px", margin: "0 auto" }}>
      <header className="mb-4 text-center">
        <h1>
          <i className="fa-solid fa-calculator text-primary me-2"></i>
          Calculadora de Obra
        </h1>
        <p className="text-muted">
          Blocos • Pisos • Argamassa • Concreto • Aço • Galinheiro • Aviário Planta SVG
        </p>
        <div className="mt-2">
          <span className={`badge ${apiOnline === true ? 'bg-success' : apiOnline === false ? 'bg-secondary' : 'bg-warning'}`}>
            API Backend: {apiOnline === true ? 'Online (Lumen)' : apiOnline === false ? 'Offline' : 'Verificando...'}
          </span>
        </div>
      </header>

      <nav className="mb-4">
        <div className="nav nav-tabs" id="calcTabs" role="tablist">
          {(['obras', 'alvenaria', 'piso', 'argamassa', 'concreto', 'aco', 'galinheiro', 'aviario'] as const).map(
            (tab) => (
              <button
                key={tab}
                type="button"
                className={`nav-link ${activeTab === tab ? 'active' : ''}`}
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              >
                {TABS[tab]}
              </button>
            )
          )}
        </div>
      </nav>

      <div className="tab-content">
        {paneles[activeTab]}
      </div>

      <footer className="mt-5 pt-4 pb-3 border-top text-muted text-center small">
        Calculadora de Obra - baseada nas fórmulas do primeiro-prompt.txt | Backend: http://localhost:8084
      </footer>
    </div>
  );
}
