"use client";

import { useEffect, useState } from "react";
import { api } from "../lib/api";
import Stats from "./Stats";

export default function Practice({ hasItems }) {
  const [queue, setQueue] = useState([]);
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });
  const [loaded, setLoaded] = useState(false);

  const startPractice = async () => {
    const data = await api.getPractice();
    setQueue(data);
    setIdx(0);
    setAnswer("");
    setFeedback(null);
    setStats({ correct: 0, wrong: 0 });
    setLoaded(true);
  };

  useEffect(() => {
    if (hasItems) startPractice();
  }, [hasItems]);

  if (!hasItems) {
    return (
      <div className="bg-card rounded-xl shadow-sm p-6 text-center text-slate-400">
        Adicione palavras ou frases na aba "Adicionar" para começar a praticar.
      </div>
    );
  }

  if (!loaded || queue.length === 0) {
    return (
      <div className="bg-card rounded-xl shadow-sm p-6 text-center text-slate-400">
        Carregando...
      </div>
    );
  }

  const current = queue[idx];

  const verify = async () => {
    const result = await api.verify(current.id, answer);
    setFeedback(result);
    setStats((s) => ({
      correct: s.correct + (result.correto ? 1 : 0),
      wrong: s.wrong + (result.correto ? 0 : 1),
    }));
  };

  const next = () => {
    if (idx < queue.length * 2 - 1) {
      setIdx(idx + 1);
      setAnswer("");
      setFeedback(null);
    }
  };

  const prev = () => {
    if (idx > 0) {
      setIdx(idx - 1);
      setAnswer("");
      setFeedback(null);
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">✏️ Praticar</h2>
        <span className="text-sm text-slate-500">
          {idx + 1}/{queue.length}
        </span>
      </div>

      <div className="border border-slate-100 rounded-lg p-6 mb-6">
        <p className="text-lg font-medium mb-1">{current.portugues}</p>
        <p className="text-sm text-slate-400 mb-4">Digite em inglês:</p>
        <input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && verify()}
          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-base mb-3"
          placeholder="Type in English"
        />
        <button
          onClick={verify}
          className="w-full bg-accent text-white rounded-lg py-2 font-medium hover:opacity-90 mb-3"
        >
          Verificar
        </button>

        {feedback && (
          <p
            className={`font-medium ${
              feedback.correto ? "text-success" : "text-danger"
            }`}
          >
            {feedback.correto
              ? "✅ Acertou! 🎉"
              : `❌ Errou! Correta: "${feedback.resposta_correta}"`}
          </p>
        )}

        <div className="flex gap-2 mt-4">
          <button
            onClick={prev}
            disabled={idx === 0}
            className="flex-1 border border-slate-200 rounded-lg py-2 text-sm disabled:opacity-40"
          >
            ⬅ Anterior
          </button>
          <button
            onClick={next}
            disabled={idx === queue.length - 1}
            className="flex-1 border border-slate-200 rounded-lg py-2 text-sm disabled:opacity-40"
          >
            Próximo ➡
          </button>
        </div>
      </div>

      <Stats stats={stats} />
    </div>
  );
}
