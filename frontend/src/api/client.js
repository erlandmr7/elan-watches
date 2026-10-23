/**
 * Cliente HTTP para comunicación con la API REST de Élan Watches.
 * Configurado para enviar cookies de sesión (HttpOnly) y cabecera CSRF.
 */

let memoryCsrfToken = '';

export function setCsrfToken(token) {
  memoryCsrfToken = token || '';
}

export function getCsrfToken() {
  if (memoryCsrfToken) return memoryCsrfToken;
  
  // Intento de fallback leyendo la cookie XSRF-TOKEN si está disponible
  const match = document.cookie.match(/(^|;)\s*XSRF-TOKEN\s*=\s*([^;]+)/);
  return match ? decodeURIComponent(match[2]) : '';
}

async function request(url, options = {}) {
  const config = {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    // Incluir cookies en todas las peticiones para mantener sesión HttpOnly
    credentials: 'include',
    ...options
  };

  // Inyectar token CSRF para peticiones mutables
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(config.method.toUpperCase())) {
    const token = getCsrfToken();
    if (token) {
      config.headers['X-CSRF-Token'] = token;
    }
  }

  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  let response;
  try {
    response = await fetch(url, config);
  } catch (netErr) {
    throw new Error('No se pudo conectar con el servidor backend. Verifique que esté ejecutándose en http://localhost:5000.');
  }

  // Si la respuesta incluye un nuevo token CSRF en el encabezado
  const newCsrf = response.headers.get('X-CSRF-Token');
  if (newCsrf) {
    setCsrfToken(newCsrf);
  }

  let data = null;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    const errorMsg = data?.message || data?.error || `Error ${response.status}: ${response.statusText}`;
    const err = new Error(errorMsg);
    err.status = response.status;
    err.data = data;
    throw err;
  }

  return data;
}

export const api = {
  get: (url) => request(url, { method: 'GET' }),
  post: (url, body) => request(url, { method: 'POST', body }),
  put: (url, body) => request(url, { method: 'PUT', body }),
  delete: (url) => request(url, { method: 'DELETE' }),
  setCsrfToken,
  getCsrfToken
};
