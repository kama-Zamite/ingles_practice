const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok && res.status !== 204) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Erro na requisição");
  }
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  listItems: () => request("/api/items"),
  addItem: (data) =>
    request("/api/items", { method: "POST", body: JSON.stringify(data) }),
  updateItem: (id, data) =>
    request(`/api/items/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteItem: (id) => request(`/api/items/${id}`, { method: "DELETE" }),
  clearAll: () => request("/api/items", { method: "DELETE" }),
  getPractice: () => request("/api/practice"),
  verify: (item_id, resposta) =>
    request("/api/verify", {
      method: "POST",
      body: JSON.stringify({ item_id, resposta }),
    }),
};
