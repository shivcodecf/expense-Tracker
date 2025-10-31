import React, { useEffect, useState, useMemo } from "react";
import {
  fetchExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../services/api";
import ExpenseCard from "../components/ExpenseCard";
import FiltersBar from "../components/FiltersBar";
import EditModal from "../components/EditModal";
import AddExpenseModal from "../components/AddExpenseModal";
import Logout from "../auth/Logout";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    startDate: "",
    endDate: "",
  });
  const [editing, setEditing] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 6;

  async function load() {
    setLoading(true);
    try {
      const data = await fetchExpenses(filters);
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("load expenses:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  useEffect(() => {
    setPage(1);
    void load();
  }, [filters]);

  const handleAdd = async (payload) => {
    await createExpense(payload);
    setAddModalOpen(false);
    await load();
  };

  const handleUpdate = async (id, payload) => {
    await updateExpense(id, payload);
    setEditing(null);
    await load();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this expense?")) return;
    await deleteExpense(id);
    await load();
  };

  // calculate total and by-category
  const total = useMemo(
    () => items.reduce((s, x) => s + (Number(x.amount) || 0), 0),
    [items]
  );
  const byCategory = useMemo(() => {
    return items.reduce((acc, x) => {
      acc[x.category] = (acc[x.category] || 0) + Number(x.amount || 0);
      return acc;
    }, {});
  }, [items]);

  // pagination
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const pageItems = items.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* header */}
   <div className="flex items-center w-full mb-6">
  <div className="flex items-center gap-10">
    <div>
      <h1 className="text-2xl font-bold text-cyan-400">Expense Tracker</h1>
      <p className="text-sm text-slate-400">
        Manage your spending effortlessly
      </p>
    </div>

    <div className="text-right ml-50">
      <div className="text-sm text-slate-400">Total Spent</div>
      <div className="text-xl font-extrabold">₹{total.toFixed(2)}</div>
    </div>
  </div>

 
  <div className="ml-auto">
    <Logout />
  </div>
</div>





      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-[100px]">
        <main className="lg:col-span-2 space-y-6">
          {/* top bar */}
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Expenses</h2>
            <div className="flex gap-2">
              <button className="btn" onClick={() => setAddModalOpen(true)}>
                + Add Expense
              </button>
              <button
                className="btn bg-stone-500"
                onClick={() => {
                  setFilters({ category: "", startDate: "", endDate: "" });
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* filters */}
          <FiltersBar
            filters={filters}
            setFilters={setFilters}
            apply={() => void load()}
          />

          
          <div className="mt-4 space-y-3">
            {loading ? (
              <div className="py-8 text-center text-slate-400">Loading...</div>
            ) : pageItems.length === 0 ? (
              <div className="py-6 text-center text-slate-500">No expenses</div>
            ) : (
              pageItems.map((e) => (
                <ExpenseCard
                  key={e._id}
                  exp={e}
                  onEdit={() => setEditing(e)}
                  onDelete={() => handleDelete(e._id)}
                />
              ))
            )}
          </div>

          {/* pagination */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-slate-400">
              Showing {pageItems.length} of {items.length}
            </div>
            <div className="flex gap-2">
              <button
                className="btn"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Prev
              </button>
              <div className="text-sm text-slate-400">
                Page {page} / {totalPages}
              </div>
              <button
                className="btn"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </button>
            </div>
          </div>
        </main>

        <aside className="space-y-6">
          <div className="card">
            <h3 className="font-semibold mb-3">Category Summary</h3>
            {Object.keys(byCategory).length === 0 ? (
              <div className="text-slate-500">No data</div>
            ) : (
              <div className="space-y-2">
                {Object.entries(byCategory)
                  .sort((a, b) => b[1] - a[1])
                  .map(([cat, amt]) => (
                    <div
                      key={cat}
                      className="flex justify-between items-center text-sm"
                    >
                      <div className="text-slate-300">{cat}</div>
                      <div className="font-semibold">₹{amt.toFixed(2)}</div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* modals */}
      <AddExpenseModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAdd}
      />
      <EditModal
        editing={editing}
        onClose={() => setEditing(null)}
        onSave={async (payload) => {
          if (!editing) return;
          await handleUpdate(editing._id, payload);
        }}
      /> 
      
    </div>
  );
}
