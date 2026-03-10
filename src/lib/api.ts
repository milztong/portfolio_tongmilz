const API_URL = '';

export async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || `Request failed: ${res.status}`);
  }

  return res.json();
}

export const authApi = {
  register: (data: { username: string; email: string; password: string }) =>
    apiFetch('/api/auth/register', { method: 'POST', body: JSON.stringify(data) }),

  login: (data: { email: string; password: string }) =>
    apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify(data) }),

  logout: () =>
    apiFetch('/api/auth/logout', { method: 'POST' }),

  me: () =>
    apiFetch('/api/auth/me'),
};

export const stockApi = {
  getDaily: () => apiFetch('/api/stocks/daily'),
  getFullHistory: (stockId: string) => apiFetch(`/api/stocks/${stockId}/history`),
};

export const predictionApi = {
  submit: (data: {
    stockId: string;
    predictedPrice: number;
    direction: 'UP' | 'DOWN';
  }) => apiFetch('/api/predictions/submit', { method: 'POST', body: JSON.stringify(data) }),

  getMy: () =>
    apiFetch('/api/predictions/my'),
};

export const resultApi = {
  get: (predictionId: string) =>
    apiFetch(`/api/results/${predictionId}`),
};