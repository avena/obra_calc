import { renderToString } from 'react-dom/server';
import Aco from '../components/Aco';

describe('Aço', () => {
  it('renderiza o módulo de aço com seu painel e título', () => {
    const html = renderToString(<Aco />);
    expect(html).toContain('id="aco"');
    expect(html).toContain('Aço (Peso e Quantidade)');
    expect(html).toContain('fa-weight-hanging');
  });
});
