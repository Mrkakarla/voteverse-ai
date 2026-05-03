export function ProgressRing({ value }: { value: number }) {
  const deg = Math.max(0, Math.min(360, (value / 100) * 360));
  return (
    <div className="relative h-28 w-28 rounded-full" style={{ background: `conic-gradient(#4f46e5 ${deg}deg, #e2e8f0 ${deg}deg)` }}>
      <div className="absolute inset-2 flex items-center justify-center rounded-full bg-white text-sm font-semibold">{Math.round(value)}%</div>
    </div>
  );
}
