export function CredibilityMeter({ score }: { score: number }) {
  const color = score >= 70 ? "#22c55e" : score >= 40 ? "#f59e0b" : "#ef4444";
  return (
    <div>
      <div className="mb-1 text-sm font-semibold">Credibility: {score}/100</div>
      <div className="h-3 rounded-full bg-slate-200"><div className="h-3 rounded-full transition-all" style={{ width: `${score}%`, backgroundColor: color }} /></div>
    </div>
  );
}
