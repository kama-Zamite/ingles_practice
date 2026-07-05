export default function Stats({ stats }) {
  const total = stats.correct + stats.wrong;
  const pct = total ? Math.round((stats.correct / total) * 100) : 0;

  return (
    <div className="flex justify-center gap-6 text-sm text-slate-600">
      <span>✅ {stats.correct}</span>
      <span>❌ {stats.wrong}</span>
      <span>({pct}%)</span>
    </div>
  );
}
