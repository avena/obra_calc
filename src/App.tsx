import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Alvenaria from './components/Alvenaria';
import Piso from './components/Piso';
import Argamassa from './components/Argamassa';
import Concreto from './components/Concreto';
import Aco from './components/Aco';
import Galinheiro from './components/Galinheiro';

const TABS: Record<string, string> = {
  alvenaria: 'Alvenaria',
  piso: 'Piso',
  argamassa: 'Argamassa',
  concreto: 'Concreto',
  aco: 'Aço',
  galinheiro: 'Galinheiro',
};

export default function App() {
  const [activeTab, setActiveTab] = useState('alvenaria');

  const paneles: Record<string, React.ReactNode> = {
    alvenaria: <Alvenaria />,
    piso: <Piso />,
    argamassa: <Argamassa />,
    concreto: <Concreto />,
    aco: <Aco />,
    galinheiro: <Galinheiro />,
  };

  return (
    <div className="container py-4">
      <header className="mb-4 text-center">
        <h1>
          <i className="fa-solid fa-calculator text-primary me-2"></i>
          Calculadora de Obra
        </h1>
        <p className="text-muted">
          Blocos • Pisos • Argamassa • Concreto • Aço • Galinheiro
        </p>
      </header>

      <nav className="mb-4">
        <div className="nav nav-tabs" id="calcTabs" role="tablist">
          {(['alvenaria', 'piso', 'argamassa', 'concreto', 'aco', 'galinheiro'] as const).map(
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

      <div className="tab-content">{paneles[activeTab]}</div>

      <footer className="mt-5 text-muted text-center small">
        Calculadora de Obra - baseada nas fórmulas do primeiro-prompt.txt
      </footer>
    </div>
  );
}
