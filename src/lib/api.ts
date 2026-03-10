let authToken: string | null =
  typeof window !== "undefined" ? sessionStorage.getItem("jwt") : null;

function setToken(token: string | null) {
  authToken = token;
  if (typeof window !== "undefined") {
    if (token) {
      sessionStorage.setItem("jwt", token);
    } else {
      sessionStorage.removeItem("jwt");
    }
  }
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  // Read token fresh on every request — fixes timing issue after redirect
  const token = authToken || (typeof window !== "undefined" ? sessionStorage.getItem("jwt") : null);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string>),
  };

  const url = path.startsWith("/api/")
    ? path.replace("/api/", "/backend/")
    : path;

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || `Request failed: ${res.status}`);
  }

  return res.json();
}

export const authApi = {
  register: async (data: { username: string; email: string; password: string }) => {
    const res = await apiFetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res.token) setToken(res.token);
    return res;
  },

  login: async (data: { email: string; password: string }) => {
    const res = await apiFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res.token) setToken(res.token);
    return res;
  },

  logout: async () => {
    setToken(null);
    return apiFetch("/api/auth/logout", { method: "POST" });
  },

  me: () => apiFetch("/api/auth/me"),
};


export const stockApi = {
  getDaily: () => apiFetch("/api/stocks/daily"),
  getFullHistory: (stockId: string) => apiFetch(`/api/stocks/${stockId}/history`),
};


export const predictionApi = {
  submit: (data: {
    stockId: string;
    predictedPrice: number;
    direction: "UP" | "DOWN";
  }) =>
    apiFetch("/api/predictions/submit", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getMy: () => apiFetch("/api/predictions/my"),
};

export const resultApi = {
  get: (predictionId: string) => apiFetch(`/api/results/${predictionId}`),
};