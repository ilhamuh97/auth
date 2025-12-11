import express from 'express';
import cookieParser from "cookie-parser";
// import cors from 'cors';

import authRoutes from "./routes/auth.route"
import { errorHandler } from './middlewares/errorHandler';

const app = express();

/*
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
*/


app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;