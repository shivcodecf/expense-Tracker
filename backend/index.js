import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import { connectDB } from './db.js';
import authRoutes from './routes/user.routes.js';
import expenseRoutes from './routes/expense.routes.js';

dotenv.config();

const app = express();


if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

const PORT = process.env.PORT || 5000;


app.use(helmet());


app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));


app.use(cors({
  origin: CLIENT_ORIGIN,
  credentials: true,
}));



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/health', (_req, res) => res.json({ ok: true }));


app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);


app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err?.stack ?? err);
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  res.status(err?.status || 500).json({ error: 'Internal server error' });
});

connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`✓ API on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('DB connection failed', err);
    process.exit(1);
  });
