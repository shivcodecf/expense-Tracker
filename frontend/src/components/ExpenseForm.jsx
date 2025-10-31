
import React, { useState, useEffect } from "react";

export default function ExpenseForm({ onSubmit, initial = null }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || "",
        amount: initial.amount || "",
        category: initial.category || "",
        date: initial.date ? initial.date.slice(0,10) : "",
      });
    }
  }, [initial]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.amount || !form.category || !form.date) {
      alert("All fields required");
      return;
    }
    setLoading(true);
    try {
      await onSubmit({ ...form, amount: Number(form.amount) });
      setForm({ title: "", amount: "", category: "", date: "" });
    } catch (err) {
      console.error(err);
      alert("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="input" />
        <input name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" type="number" className="input" />
        <select name="category" value={form.category} onChange={handleChange} className="input">
          <option value="">Category</option>
          <option>Food</option>
          <option>Travel</option>
          <option>Bills</option>
          <option>Shopping</option>
          <option>Health</option>
          <option>Other</option>
        </select>
        <input name="date" value={form.date} onChange={handleChange} type="date" className="input" />
      </div>

      <div className="flex gap-2">
        <button className="btn" type="submit" disabled={loading}>{loading ? "Saving..." : "Save"}</button>
      </div>
    </form>
  );
}
