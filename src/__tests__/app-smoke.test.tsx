import { renderToString } from 'react-dom/server';
import App from '../App';

describe('setup: bootstrap do React via ReactDOM', () => {
  it('renderiza o App sem falhar', () => {
    const html = renderToString(<App />);
    expect(html).toContain('Calculadora de Obra');
    expect(html).toContain('id="calcTabs"');
  });
});
