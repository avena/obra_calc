import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SalvarCalculoBtn from '../components/SalvarCalculoBtn';
import { ObraContext } from '../context/ObraContext';

describe('SalvarCalculoBtn', () => {
  it('exibe aviso quando nenhuma obra está ativa', () => {
    render(
      <ObraContext.Provider
        value={{
          obras: [],
          obraAtiva: null,
          setObraAtiva: () => {},
          carregarObras: async () => {},
          salvarCalculo: async () => true,
          pendentesSync: 0,
          sincronizarFila: async () => ({ sincronizados: 0, erros: 0 }),
        }}
      >
        <SalvarCalculoBtn tipo="alvenaria" parametros={{ comp: 5 }} resultado={{ blocos: 120 }} />
      </ObraContext.Provider>
    );

    expect(screen.getByText(/Selecione uma obra ativa no cabeçalho/i)).toBeInTheDocument();
  });

  it('salva o cálculo com sucesso na obra ativa', async () => {
    const calls: any[] = [];
    const salvarMock = async (...args: any[]) => {
      calls.push(args);
      return true;
    };

    render(
      <ObraContext.Provider
        value={{
          obras: [{ id: 1, nome_obra: 'Aviário Modelo' }],
          obraAtiva: { id: 1, nome_obra: 'Aviário Modelo' },
          setObraAtiva: () => {},
          carregarObras: async () => {},
          salvarCalculo: salvarMock,
          pendentesSync: 0,
          sincronizarFila: async () => ({ sincronizados: 0, erros: 0 }),
        }}
      >
        <SalvarCalculoBtn tipo="alvenaria" parametros={{ comp: 5 }} resultado={{ blocos: 120 }} />
      </ObraContext.Provider>
    );

    const btn = screen.getByRole('button', { name: /Salvar Cálculo nesta Obra/i });
    fireEvent.click(btn);

    await waitFor(() => {
      expect(calls).toEqual([['alvenaria', { comp: 5 }, { blocos: 120 }]]);
      expect(screen.getByText(/Salvo com sucesso!/i)).toBeInTheDocument();
    });
  });
});
