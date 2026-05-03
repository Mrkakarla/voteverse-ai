export function Progress({ value = 0 }: { value?: number }) {
  return (
    <div className="h-2 w-full rounded-full bg-slate-200">
      <div className="h-2 rounded-full bg-indigo-600 transition-all" style={{ width: `${value}%` }} />
    </div>
  );
}
