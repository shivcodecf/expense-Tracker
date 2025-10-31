
import React from "react";
import ExpenseForm from "./ExpenseForm";

export default function AddExpenseModal({ open, onClose, onSubmit }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 border border-slate-700 rounded-2xl shadow-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-cyan-400">
            Add New Expense
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 text-xl font-bold"
          >
            ×
          </button>
        </div>

        <ExpenseForm onSubmit={onSubmit} />

        <div className="mt-4 text-right">
          <button className="btn bg-slate-700 text-slate-100" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
