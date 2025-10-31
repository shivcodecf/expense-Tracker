export default function StatCard({ label, value }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 min-w-[130px]">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="mt-1 font-bold text-slate-100">{value}</div>
    </div>
  );
}
