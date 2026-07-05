"use client";

import { useForm } from "react-hook-form";

export default function AddForm({ items, onAdd, onDelete, onClearAll }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { tipo: "palavra", portugues: "", ingles: "" },
  });

  const onSubmit = async (data) => {
    await onAdd(data);
    reset({ tipo: data.tipo, portugues: "", ingles: "" });
  };

  return (
    <div className="bg-card rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-4">📚 Adicionar palavra/frase</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mb-6">
        <select
          {...register("tipo")}
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-base"
        >
          <option value="palavra">Palavra</option>
          <option value="frase">Frase</option>
        </select>
        <input
          {...register("portugues", { required: true })}
          placeholder="Português"
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-base"
        />
        <input
          {...register("ingles", { required: true })}
          placeholder="Inglês"
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-base"
        />
        <button
          type="submit"
          className="w-full bg-accent text-white rounded-lg py-2 font-medium hover:opacity-90"
        >
          ➕ Adicionar
        </button>
      </form>

      <h3 className="text-sm text-slate-500 mb-2">Itens adicionados</h3>
      <div className="divide-y divide-slate-100">
        {items.length === 0 && (
          <p className="text-slate-400 text-sm py-4">Nenhum item ainda.</p>
        )}
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between py-2 text-sm"
          >
            <span>
              {item.tipo === "palavra" ? "📝" : "📄"} {item.portugues} →{" "}
              {item.ingles}
            </span>
            <button
              onClick={() => onDelete(item.id)}
              className="text-danger hover:opacity-70"
              aria-label="Excluir"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <button
          onClick={onClearAll}
          className="mt-6 w-full border border-danger text-danger rounded-lg py-2 text-sm font-medium hover:bg-red-50"
        >
          🗑️ Limpar todos os dados
        </button>
      )}
    </div>
  );
}
