
import dayjs from "dayjs";

export default function ExpenseCard({ exp, onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-between bg-slate-900 border border-slate-700 rounded-xl px-4 py-3">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-md bg-slate-800 flex items-center justify-center text-sm font-bold text-cyan-300">
          {exp.category?.[0]?.toUpperCase() || "—"}
        </div>
        <div>
          <div className="font-semibold text-slate-100">{exp.title}</div>
          <div className="small text-slate-400">{dayjs(exp.date).format("DD MMM YYYY")}</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-lg font-extrabold text-slate-100">₹{Number(exp.amount).toFixed(2)}</div>
        <button className="btn" onClick={onEdit}>Edit</button>
        <button className="btn bg-red-600 hover:bg-red-500 text-white" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
