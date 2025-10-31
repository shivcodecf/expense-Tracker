import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './db.js';
import authRoutes from './routes/user.routes.js';
import expenseRoutes from './routes/expense.routes.js';

dotenv.config();

const app = express();



const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
const PORT = process.env.PORT || 5000;


app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


app.get('/health', (_req, res) => res.json({ ok: true }));


app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`✓ API on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('DB connection failed', err);
    process.exit(1);
  });
