const API_URL = import.meta.env.VITE_API_URL || "https://power-zone-website.onrender.com";

async function request(path, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export const api = {
  url: API_URL,
  signup: (payload) => request("/api/auth/signup", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload) => request("/api/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  me: () => request("/api/auth/me"),
  getServices: () => request("/api/auth/services"),
  saveServices: (payload) => request("/api/auth/services", { method: "POST", body: JSON.stringify(payload) }),
  adminUsers: () => request("/api/auth/admin/users"),
  sendContact: (payload) => request("/api/contact", { method: "POST", body: JSON.stringify(payload) }),
  contactMessages: () => request("/api/contact"),
};
