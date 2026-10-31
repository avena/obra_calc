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
import { ObraProvider, useObra } from './context/ObraContext';

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

function AppContent() {
  const [activeTab, setActiveTab] = useState('obras');
  const { obras, obraAtiva, setObraAtiva, pendentesSync, sincronizarFila } = useObra();
  const [sincronizando, setSincronizando] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('theme');
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

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
    <div className="container-fluid py-4 px-lg-5" style={{ maxWidth: '1500px', margin: '0 auto' }}>
      <header className="mb-4 text-center">
        <h1>
          <i className="fa-solid fa-calculator text-primary me-2"></i>
          Calculadora de Obra
        </h1>
        <p className="text-muted">
          Blocos • Pisos • Argamassa • Concreto • Aço • Galinheiro • Aviário Planta SVG
        </p>

        <div className="mt-2 d-flex align-items-center justify-content-center gap-2 flex-wrap">
          <span className={`badge ${apiOnline === true ? 'bg-success' : apiOnline === false ? 'bg-secondary' : 'bg-warning'}`}>
            API Backend: {apiOnline === true ? 'Online (Lumen)' : apiOnline === false ? 'Offline' : 'Verificando...'}
          </span>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            aria-label={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          >
            <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
        </div>

        <div className="d-flex justify-content-center align-items-center gap-2 mt-3 flex-wrap">
          <div className="input-group input-group-sm" style={{ maxWidth: '380px' }}>
            <span className="input-group-text bg-dark-subtle">
              <i className="fa-solid fa-helmet-safety text-warning me-1"></i>
              {obraAtiva ? 'Calculando para:' : 'Obra Ativa:'}
            </span>
            <select
              className="form-select form-select-sm"
              value={obraAtiva?.id || ''}
              onChange={(e) => {
                const id = Number(e.target.value);
                const sel = obras.find((o) => o.id === id) || null;
                setObraAtiva(sel);
              }}
              aria-label="Selecionar obra ativa"
            >
              <option value="">Nenhuma obra selecionada</option>
              {obras.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.nome_obra} {o.finalidade ? `[${o.finalidade}]` : `(#${o.id})`}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            className="btn btn-sm btn-secondary position-relative"
            disabled={sincronizando}
            onClick={async () => {
              setSincronizando(true);
              await sincronizarFila();
              setSincronizando(false);
            }}
            title={pendentesSync > 0 ? `${pendentesSync} cálculo(s) pendente(s) na fila offline` : 'Tudo sincronizado com a nuvem'}
          >
            <i className={`fa-solid ${sincronizando ? 'fa-spinner fa-spin' : 'fa-cloud-arrow-up'} me-2`}></i>
            {sincronizando ? 'Sincronizando...' : 'Sincronizar Nuvem'}
            {pendentesSync > 0 && (
              <span className="badge bg-warning text-dark ms-2">{pendentesSync}</span>
            )}
          </button>
          <button type="button" className="btn btn-sm btn-primary" onClick={() => setActiveTab('obras')}>
            <i className="fa-solid fa-plus me-2"></i>Nova Obra
          </button>
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

export default function App() {
  return (
    <ObraProvider>
      <AppContent />
    </ObraProvider>
  );
}
