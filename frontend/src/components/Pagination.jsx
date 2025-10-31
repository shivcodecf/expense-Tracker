export default function Pagination({ page = 1, limit = 10, total = 0, onPage }) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  return (
    <div className="flex items-center gap-2">
      <button className="btn" disabled={page <= 1} onClick={() => onPage(page - 1)}>Prev</button>
      <div className="text-sm text-slate-400">Page {page} / {totalPages}</div>
      <button className="btn" disabled={page >= totalPages} onClick={() => onPage(page + 1)}>Next</button>
    </div>
  );
}
