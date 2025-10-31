
import React, { useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm";

export default function EditModal({ editing, onClose, onSave }) {
  const [initial, setInitial] = useState(null);

  useEffect(() => {
    if (editing) {
      setInitial({
        ...editing,
        date: editing.date ? editing.date.slice(0,10) : ""
      });
    } else {
      setInitial(null);
    }
  }, [editing]);

  if (!editing) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="card max-w-md w-full" onClick={e=>e.stopPropagation()}>
        <h3 className="text-lg font-semibold mb-3">Edit Expense</h3>
        <ExpenseForm initial={initial} onSubmit={async (payload) => { await onSave(payload); }} />
        <div className="mt-3 text-right">
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
