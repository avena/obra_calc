import { TextEncoder, TextDecoder } from 'util';

if (typeof globalThis.TextEncoder === 'undefined') {
  (globalThis as any).TextEncoder = TextEncoder;
  (globalThis as any).TextDecoder = TextDecoder;
}

// ponytail: basic stub returning ok/empty list; upgrade to msw if test suite expands
if (typeof globalThis.fetch === 'undefined') {
  (globalThis as any).fetch = (url: string | URL | Request) => {
    const urlStr = String(url);
    const data = urlStr.includes('ping') ? { status: 'ok' } : [];
    return Promise.resolve({
      ok: true,
      json: async () => data,
    });
  };
}
