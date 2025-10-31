import express from 'express'


import { createExpense, deleteExpense, getExpense, updateExpense } from '../controllers/expense.controllers.js';
import { authOptional } from '../middlewares/auth.js';

const router = express.Router();

router.post("/",authOptional,createExpense);

router.get("/",authOptional,getExpense)

router.put("/:id",authOptional,updateExpense)

router.delete("/:id",authOptional,deleteExpense)





export default router