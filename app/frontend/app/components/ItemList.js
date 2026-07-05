"use client";

import { useState } from "react";

export default function ItemList({ items, onDelete, onEdit }) {
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ portugues: "", ingles: "" });

  const filtered = items.filter(
    (i) =>
      i.portugues.toLowerCase().includes(query.toLowerCase()) ||
      i.ingles.toLowerCase().includes(query.toLowerCase())
  );

  const startEdit = (item) => {
    setEditingId(item.id);
    setDraft({ portugues: item.portugues, ingles: item.ingles });
  };

  const saveEdit = async (id) => {
    await onEdit(id, draft);
    setEditingId(null);
  };

  return (
    <div className="bg-card rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-4">📋 Todos os itens</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="🔍 Buscar..."
        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-base mb-4"
      />

      <div className="divide-y divide-slate-100">
        {filtered.length === 0 && (
          <p className="text-slate-400 text-sm py-4">Nenhum item encontrado.</p>
        )}
        {filtered.map((item) => (
          <div key={item.id} className="py-2 text-sm">
            {editingId === item.id ? (
              <div className="flex gap-2 items-center">
                <input
                  value={draft.portugues}
                  onChange={(e) =>
                    setDraft({ ...draft, portugues: e.target.value })
                  }
                  className="flex-1 border border-slate-200 rounded px-2 py-1"
                />
                <input
                  value={draft.ingles}
                  onChange={(e) =>
                    setDraft({ ...draft, ingles: e.target.value })
                  }
                  className="flex-1 border border-slate-200 rounded px-2 py-1"
                />
                <button
                  onClick={() => saveEdit(item.id)}
                  className="text-success"
                >
                  ✅
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="text-slate-400"
                >
                  ✖️
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span>
                  {item.tipo === "palavra" ? "📝" : "📄"} {item.portugues} →{" "}
                  {item.ingles}
                </span>
                <span className="flex gap-3">
                  <button onClick={() => startEdit(item)}>✏️</button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-danger"
                  >
                    🗑️
                  </button>
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-sm text-slate-400 mt-4">Total: {items.length} itens</p>
    </div>
  );
}
