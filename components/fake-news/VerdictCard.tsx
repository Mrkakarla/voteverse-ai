export function VerdictCard({ verdict, explanation }: { verdict: string; explanation: string }) {
  const map: Record<string, string> = {
    true: "Likely True",
    false: "Likely False",
    misleading: "Misleading",
    unverified: "Unverified",
  };
  return (
    <div className="card p-4">
      <p className="text-sm font-bold">Verdict: {map[verdict] || verdict}</p>
      <p className="mt-2 text-sm text-slate-600">{explanation}</p>
    </div>
  );
}
