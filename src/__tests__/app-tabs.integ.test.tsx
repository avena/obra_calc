/** @jest-environment jsdom */
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App - navegação por tabs', () => {
  it('renderiza o header com título "Calculadora de Obra" e ícone Font Awesome', () => {
    const { container } = render(<App />);
    expect(screen.getByText('Calculadora de Obra')).toBeInTheDocument();
    expect(container.querySelector('i.fa-solid.fa-calculator')).not.toBeNull();
  });

  it('renderiza as 5 abas: Alvenaria, Piso, Argamassa, Concreto e Aço', () => {
    render(<App />);
    for (const label of [
      'Alvenaria',
      'Piso',
      'Argamassa',
      'Concreto',
      'Aço',
    ]) {
      expect(screen.getByRole('tab', { name: label })).toBeInTheDocument();
    }
  });

  it('ativa a aba Alvenaria por padrão e exibe seu conteúdo', () => {
    render(<App />);
    expect(screen.getByRole('tab', { name: 'Alvenaria' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByText('Quantidade de Blocos')).toBeInTheDocument();
  });

  it('altera o conteúdo ao clicar em outra aba', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('tab', { name: 'Piso' }));
    expect(screen.getByRole('tab', { name: 'Piso' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByText('Quantidade de Pisos')).toBeInTheDocument();
    expect(screen.queryByText('Quantidade de Blocos')).not.toBeInTheDocument();
  });

  it('renderiza o footer com referência ao primeiro-prompt.txt', () => {
    render(<App />);
    expect(screen.getByText(/primeiro-prompt\.txt/)).toBeInTheDocument();
  });
});
