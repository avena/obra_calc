import { readFileSync } from 'fs';
import { resolve, join } from 'path';

const root = resolve(process.cwd());
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));

describe('setup: package.json dependências', () => {
  it('declara dependências de produção exigidas', () => {
    expect(pkg.dependencies.react).toBeDefined();
    expect(pkg.dependencies['react-dom']).toBeDefined();
    expect(pkg.dependencies.bootstrap).toBeDefined();
  });

  it('declara devDependencies exigidas (incluindo jest e ts-jest)', () => {
    expect(pkg.devDependencies.vite).toBeDefined();
    expect(pkg.devDependencies.typescript).toBeDefined();
    expect(pkg.devDependencies['@vitejs/plugin-react']).toBeDefined();
    expect(pkg.devDependencies['@types/react']).toBeDefined();
    expect(pkg.devDependencies['@types/react-dom']).toBeDefined();
    expect(pkg.devDependencies.jest).toBeDefined();
    expect(pkg.devDependencies['ts-jest']).toBeDefined();
  });

  it('expõe script de test', () => {
    expect(pkg.scripts.test).toBeDefined();
  });
});
