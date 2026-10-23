import { renderToString } from 'react-dom/server';
import Argamassa from '../components/Argamassa';

describe('Argamassa', () => {
  it('renderiza o módulo de argamassa com seu painel e título', () => {
    const html = renderToString(<Argamassa />);
    expect(html).toContain('id="argamassa"');
    expect(html).toContain('Reboco e Argamassa');
    expect(html).toContain('fa-boxes');
  });
});
