import { renderToString } from 'react-dom/server';
import Concreto from '../components/Concreto';

describe('Concreto', () => {
  it('renderiza o módulo de concreto com seu painel e título', () => {
    const html = renderToString(<Concreto />);
    expect(html).toContain('id="concreto"');
    expect(html).toContain('Volume de Concreto');
    expect(html).toContain('fa-cone');
  });
});
