import { Router } from 'express';
import { insertNewUser } from '../controllers/authController.js';
import { newUserMiddleware } from '../middlewares/authMiddlewares.js';

const authRouter = Router();

authRouter.post("/sign-up", newUserMiddleware, insertNewUser);
authRouter.post("/sign-in");

export default authRouter;