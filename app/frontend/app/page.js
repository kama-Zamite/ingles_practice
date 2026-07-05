"use client";

import { useEffect, useState } from "react";
import { api } from "./lib/api";
import AddForm from "./components/AddForm";
import Practice from "./components/Practice";
import ItemList from "./components/ItemList";

const TABS = [
  { id: "add", label: "Adicionar" },
  { id: "practice", label: "Praticar" },
  { id: "list", label: "Lista completa" },
];

export default function Home() {
  const [tab, setTab] = useState("add");
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    const data = await api.listItems();
    setItems(data);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleAdd = async (data) => {
    await api.addItem(data);
    await loadItems();
  };

  const handleDelete = async (id) => {
    await api.deleteItem(id);
    await loadItems();
  };

  const handleEdit = async (id, data) => {
    await api.updateItem(id, data);
    await loadItems();
  };

  const handleClearAll = async () => {
    if (!confirm("Tem certeza que deseja apagar todos os dados?")) return;
    await api.clearAll();
    await loadItems();
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Prática de Inglês
      </h1>

      <div className="flex gap-2 mb-6">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium border ${
              tab === t.id
                ? "bg-accent text-white border-accent"
                : "bg-white text-slate-600 border-slate-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "add" && (
        <AddForm
          items={items}
          onAdd={handleAdd}
          onDelete={handleDelete}
          onClearAll={handleClearAll}
        />
      )}
      {tab === "practice" && <Practice hasItems={items.length > 0} />}
      {tab === "list" && (
        <ItemList items={items} onDelete={handleDelete} onEdit={handleEdit} />
      )}
    </main>
  );
}
