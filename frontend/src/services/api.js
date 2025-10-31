// client/src/services/api.js
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, 
});

export async function fetchExpenses({ category, startDate, endDate } = {}) {
  const params = {};
  if (category) params.category = category;
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;
  const res = await api.get("/expenses", { params });
  return res.data; 
}

export async function createExpense(payload) {
  const res = await api.post("/expenses", payload);
  return res.data;
}

export async function updateExpense(id, payload) {
  const res = await api.put(`/expenses/${id}`, payload);
  return res.data;
}

export async function deleteExpense(id) {
  const res = await api.delete(`/expenses/${id}`);
  return res.data;
}
