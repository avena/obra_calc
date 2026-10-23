const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8084/api';

export async function ping() {
  const res = await fetch(`${API_BASE_URL}/ping`);
  return res.json();
}

export async function calcular(tipo: string, dados: any) {
  const res = await fetch(`${API_BASE_URL}/calculos/${tipo}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  return res.json();
}

export async function listarObras() {
  const res = await fetch(`${API_BASE_URL}/obras`);
  return res.json();
}

export async function criarObra(dados: any) {
  const res = await fetch(`${API_BASE_URL}/obras`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  return res.json();
}

export async function salvarCalculoNaObra(obraId: number, tipo: string, parametros: any, resultado: any) {
  const res = await fetch(`${API_BASE_URL}/obras/${obraId}/calculos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tipo, parametros, resultado }),
  });
  return res.json();
}

export async function listarNormativas() {
  const res = await fetch(`${API_BASE_URL}/normativas`);
  return res.json();
}
