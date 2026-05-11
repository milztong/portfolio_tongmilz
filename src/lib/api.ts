// Zentralisiertes API-Modul für die Kommunikation mit dem Backend

// In-memory Speicherung des Authentifizierungs-Tokens, um Timing-Probleme nach Redirects zu vermeiden
let authToken: string | null =
  typeof window !== "undefined" ? sessionStorage.getItem("jwt") : null;

  // Hilfsfunktion zum Setzen oder Entfernen des Authentifizierungs-Tokens
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

// Allgemeine Funktion zum Aufruf von API-Endpunkten mit automatischer Token-Verwaltung
export async function apiFetch(path: string, options: RequestInit = {}) {
  // Verwende den in-memory Token, um Timing-Probleme zu vermeiden, insbesondere nach Redirects
  const token = authToken || (typeof window !== "undefined" ? sessionStorage.getItem("jwt") : null);
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string>),
  };
  // Ersetze den API-Pfad durch den Backend-Pfad, wenn er mit "/api/" beginnt
  const url = path.startsWith("/api/")
    ? path.replace("/api/", "/backend/")
    : path;
  // Führe den Fetch-Aufruf durch und überprüfe die Antwort
  const res = await fetch(url, {
    ...options,
    headers,
  });
  // Wenn die Antwort nicht erfolgreich ist, versuche den Fehlertext zu lesen und werfe einen Fehler
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || `Request failed: ${res.status}`);
  }
  // Versuche, die Antwort als JSON zu parsen, falls möglich
  return res.json();
}

// Spezifische API-Funktionen für Authentifizierung, Aktieninformationen, Vorhersagen und Ergebnisse
export const authApi = {
  // Registrierung eines neuen Benutzers und Speicherung des Tokens
  register: async (data: { username: string; email: string; password: string }) => {
    const res = await apiFetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res.token) setToken(res.token);
    return res;
  },
  // Anmeldung eines Benutzers und Speicherung des Tokens
  login: async (data: { email: string; password: string }) => {
    const res = await apiFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res.token) setToken(res.token);
    return res;
  },
  // Abmeldung eines Benutzers und Entfernen des Tokens
  logout: async () => {
    setToken(null);
    return apiFetch("/api/auth/logout", { method: "POST" });
  },
  // Abrufen der Informationen des aktuell angemeldeten Benutzers
  me: () => apiFetch("/api/auth/me"),
};

// API-Funktionen für den Zugriff auf Aktieninformationen
export const stockApi = {
  // Abrufen der täglichen Aktieninformationen
  getToday: () => apiFetch("/api/challenge/today"),
  // Abrufen der vollständigen Historie einer bestimmten Aktie
  getFullHistory: (stockId: string) => apiFetch(`/api/stocks/${stockId}/history`),
};

// API-Funktionen für das Einreichen und Abrufen von Vorhersagen
export const predictionApi = {
  // Einreichen einer neuen Vorhersage für eine Aktie
  submit: (data: {
    stockId: string;
    predictedPrice: number;
    direction: "UP" | "DOWN";
  }) =>
    // Verwende die apiFetch-Funktion, um die Vorhersage-Daten an den Backend-Endpunkt zu senden
    apiFetch("/api/predictions/submit", {
      method: "POST",
      body: JSON.stringify(data),
    }),
    // Abrufen aller Vorhersagen des aktuell angemeldeten Benutzers
  getMy: () => apiFetch("/api/predictions/my"),
};

// API-Funktionen für das Abrufen von Vorhersageergebnissen
export const resultApi = {
  get: (predictionId: string) => apiFetch(`/api/results/${predictionId}`),
};