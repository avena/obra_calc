import { renderToString } from 'react-dom/server';
import Alvenaria from '../components/Alvenaria';

describe('Alvenaria', () => {
  it('renderiza o módulo de alvenaria com seu painel e título', () => {
    const html = renderToString(<Alvenaria />);
    expect(html).toContain('id="alvenaria"');
    expect(html).toContain('Quantidade de Blocos');
    expect(html).toContain('fa-wall-brick');
  });
});
