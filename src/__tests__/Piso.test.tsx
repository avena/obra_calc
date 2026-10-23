import { renderToString } from 'react-dom/server';
import Piso from '../components/Piso';

describe('Piso', () => {
  it('renderiza o módulo de piso com seu painel e título', () => {
    const html = renderToString(<Piso />);
    expect(html).toContain('id="piso"');
    expect(html).toContain('Quantidade de Pisos');
    expect(html).toContain('fa-floor-tile');
  });
});
