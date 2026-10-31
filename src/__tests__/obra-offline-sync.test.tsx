import '@testing-library/jest-dom';
import { ObraProvider, useObra } from '../context/ObraContext';
import { render, screen, act } from '@testing-library/react';

function SyncConsumer() {
  const { salvarCalculo, pendentesSync, sincronizarFila, setObraAtiva } = useObra();

  return (
    <div>
      <span data-testid="pendentes">{pendentesSync}</span>
      <button
        onClick={() => {
          setObraAtiva({ id: 99, nome_obra: 'Obra Teste' });
        }}
      >
        Ativar
      </button>
      <button
        onClick={async () => {
          // Força falha simulando offline
          const originalFetch = globalThis.fetch;
          globalThis.fetch = () => Promise.reject(new Error('Network error'));
          await salvarCalculo('piso', { area: 50 }, { pecas: 75 });
          globalThis.fetch = originalFetch;
        }}
      >
        SalvarOffline
      </button>
      <button
        onClick={async () => {
          await sincronizarFila();
        }}
      >
        Sync
      </button>
    </div>
  );
}

describe('Fila Offline e Sincronização', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('enfileira cálculo no localStorage quando offline e atualiza contador', async () => {
    render(
      <ObraProvider>
        <SyncConsumer />
      </ObraProvider>
    );

    act(() => {
      screen.getByText('Ativar').click();
    });

    await act(async () => {
      screen.getByText('SalvarOffline').click();
    });

    expect(screen.getByTestId('pendentes')).toHaveTextContent('1');
    const salvo = JSON.parse(localStorage.getItem('obra_calc_fila_offline') || '[]');
    expect(salvo).toHaveLength(1);
    expect(salvo[0].tipo).toBe('piso');
  });
});
