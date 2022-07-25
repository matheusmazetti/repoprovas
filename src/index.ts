import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'express-async-errors';
import authRouter from './routes/authRouter.js';
import examsRouter from './routes/examsRouter.js';
import { errorHandling } from './middlewares/errorHandlingMiddleware.js';

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(examsRouter);
app.use(errorHandling);

export default app;