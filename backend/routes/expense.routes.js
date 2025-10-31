import express from 'express'


import { createExpense, deleteExpense, getExpense, updateExpense } from '../controllers/expense.controllers.js';

import { authRequired } from '../middlewares/auth.js';

const router = express.Router();

router.post("/",authRequired,createExpense);

router.get("/",authRequired,getExpense)

router.put("/:id",authRequired,updateExpense)

router.delete("/:id",authRequired,deleteExpense)





export default router