import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Galinheiro from '../components/Galinheiro';

describe('Galinheiro', () => {
  beforeEach(() => {
    render(<Galinheiro />);
  });

  test('renderiza os inputs de comprimento, largura e galinhas por m²', () => {
    expect(screen.getByLabelText(/Comprimento \(m\)/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Largura \(m\)/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Galinhas por m²/)).toBeInTheDocument();
  });

  test('calcula área total = comprimento × largura', () => {
    const compInput = screen.getByLabelText(/Comprimento \(m\)/);
    const largInput = screen.getByLabelText(/Largura \(m\)/);
    const btn = screen.getByRole('button', { name: /Calcular/ });

    fireEvent.change(compInput, { target: { value: '5' } });
    fireEvent.change(largInput, { target: { value: '4' } });
    fireEvent.click(btn);

    expect(screen.getByText(/Área total:/)).toBeInTheDocument();
    expect(screen.getByText(/20\.00 m²/)).toBeInTheDocument();
  });

  test('calcula zona de postura = 30% da área total', () => {
    const compInput = screen.getByLabelText(/Comprimento \(m\)/);
    const largInput = screen.getByLabelText(/Largura \(m\)/);
    const btn = screen.getByRole('button', { name: /Calcular/ });

    fireEvent.change(compInput, { target: { value: '10' } });
    fireEvent.change(largInput, { target: { value: '10' } });
    fireEvent.click(btn);

    // postura e pasto são ambos 30%, então há 2 elementos com "30,00 m²"
    expect(screen.getAllByText(/30\.00 m²/)).toHaveLength(2);
  });

  test('calcula zona de pernoite = 40% da área total', () => {
    const compInput = screen.getByLabelText(/Comprimento \(m\)/);
    const largInput = screen.getByLabelText(/Largura \(m\)/);
    const btn = screen.getByRole('button', { name: /Calcular/ });

    fireEvent.change(compInput, { target: { value: '10' } });
    fireEvent.change(largInput, { target: { value: '10' } });
    fireEvent.click(btn);

    expect(screen.getByText(/40\.00 m²/)).toBeInTheDocument();
  });

  test('calcula zona de pasto = 30% da área total', () => {
    const compInput = screen.getByLabelText(/Comprimento \(m\)/);
    const largInput = screen.getByLabelText(/Largura \(m\)/);
    const btn = screen.getByRole('button', { name: /Calcular/ });

    fireEvent.change(compInput, { target: { value: '10' } });
    fireEvent.change(largInput, { target: { value: '10' } });
    fireEvent.click(btn);

    // postura e pasto são ambos 30%, então há 2 elementos com "30,00 m²"
    expect(screen.getAllByText(/30\.00 m²/)).toHaveLength(2);
  });

  test('calcula total de galinhas = área × galinhas por m²', () => {
    const compInput = screen.getByLabelText(/Comprimento \(m\)/);
    const largInput = screen.getByLabelText(/Largura \(m\)/);
    const gmpqInput = screen.getByLabelText(/Galinhas por m²/);
    const btn = screen.getByRole('button', { name: /Calcular/ });

    fireEvent.change(compInput, { target: { value: '10' } });
    fireEvent.change(largInput, { target: { value: '10' } });
    fireEvent.change(gmpqInput, { target: { value: '4' } });
    fireEvent.click(btn);

    expect(screen.getAllByText(/Total de galinhas:/)).toHaveLength(1);
    expect(screen.getAllByText(/400/)).toHaveLength(1);
  });

  test('calcula madeira = perímetro = 2 × (c + l)', () => {
    const compInput = screen.getByLabelText(/Comprimento \(m\)/);
    const largInput = screen.getByLabelText(/Largura \(m\)/);
    const btn = screen.getByRole('button', { name: /Calcular/ });

    fireEvent.change(compInput, { target: { value: '5' } });
    fireEvent.change(largInput, { target: { value: '4' } });
    fireEvent.click(btn);

    expect(screen.getByText(/Madeira necessária:/)).toBeInTheDocument();
    expect(screen.getByText(/18\.00 m/)).toBeInTheDocument();
  });

  test('exibe alerta de sucesso após calcular', () => {
    const compInput = screen.getByLabelText(/Comprimento \(m\)/);
    const largInput = screen.getByLabelText(/Largura \(m\)/);
    const btn = screen.getByRole('button', { name: /Calcular/ });

    fireEvent.change(compInput, { target: { value: '5' } });
    fireEvent.change(largInput, { target: { value: '4' } });
    fireEvent.click(btn);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('alert-success');
  });

  test('não exibe resultado com valores inválidos (zero)', () => {
    const compInput = screen.getByLabelText(/Comprimento \(m\)/);
    const largInput = screen.getByLabelText(/Largura \(m\)/);
    const btn = screen.getByRole('button', { name: /Calcular/ });

    fireEvent.change(compInput, { target: { value: '0' } });
    fireEvent.change(largInput, { target: { value: '0' } });
    fireEvent.click(btn);

    expect(screen.queryByText(/Resultado:/)).toBeNull();
  });
});