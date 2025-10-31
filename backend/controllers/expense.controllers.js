import { Expense } from "../models/Expense.model.js";



export const createExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;
    if (!title || amount == null || !category || !date) {
      return res
        .status(400)
        .json({ error: "title, amount, category, date are required" });
    }
    const expense = await Expense.create({
      userId: req.user.id,
      title,
      amount: Number(amount),
      category,
      date: new Date(date),
    });
    res.status(201).json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getExpense = async (req, res) => {
  try {
    const { category, startDate, endDate } = req.query;
    const filter = { userId: req.user.id };
    if (category) filter.category = category;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    const items = await Expense.find(filter).sort({ date: -1, createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, category, date } = req.body;
    const update = {};
    if (title != null) update.title = title;
    if (amount != null) update.amount = Number(amount);
    if (category != null) update.category = category;
    if (date != null) update.date = new Date(date);

    const doc = await Expense.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { $set: update },
      { new: true }
    );
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Expense.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
