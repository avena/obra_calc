import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AviarioPlantaSVG from '../components/AviarioPlantaSVG';

describe('AviarioPlantaSVG', () => {
  beforeEach(() => {
    render(<AviarioPlantaSVG />);
  });

  test('renderiza o cabeçalho com título da planta baixa', () => {
    expect(screen.getByText(/Planta Baixa — Aviário/)).toBeInTheDocument();
  });

  test('exibe o banner de orientação solar Leste-Oeste', () => {
    expect(screen.getByText(/LESTE – OESTE/)).toBeInTheDocument();
  });

  test('renderiza os botões de seleção de template', () => {
    expect(screen.getByText(/Planta Corte 5 Fases/)).toBeInTheDocument();
    expect(screen.getByText(/Módulo 50 Poedeiras/)).toBeInTheDocument();
  });

  test('renderiza o elemento SVG da planta', () => {
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  test('renderiza os compartimentos da planta 7x4m', () => {
    expect(screen.getAllByText(/INCUBAÇÃO/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/POSTURA/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/TERMINAÇÃO/).length).toBeGreaterThan(0);
  });

  test('alterna para o módulo 3x3m ao clicar no botão', () => {
    const btn = screen.getByText(/Módulo 50 Poedeiras/);
    fireEvent.click(btn);
    expect(screen.getByText(/Módulo Padrão Poedeiras \(3,0m × 3,0m\)/)).toBeInTheDocument();
  });

  test('exibe quantitativos de materiais no painel lateral', () => {
    expect(screen.getByText(/Perímetro Total de Mureta/)).toBeInTheDocument();
    expect(screen.getByText(/Blocos 9×19×19/)).toBeInTheDocument();
  });

  test('exibe ninhos e poleiros no resumo', () => {
    expect(screen.getAllByText(/Ninhos/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Poleiros/).length).toBeGreaterThan(0);
  });

  test('exibe alerta técnico na aba Cria', () => {
    fireEvent.click(screen.getAllByText(/CRIA/)[0]);
    expect(screen.getByText(/erro tipográfico/)).toBeInTheDocument();
  });
});