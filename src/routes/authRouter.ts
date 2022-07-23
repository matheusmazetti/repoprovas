import { Router } from 'express';
import { insertNewUser, login } from '../controllers/authController.js';
import { loginMiddleware, newUserMiddleware } from '../middlewares/authMiddlewares.js';

const authRouter = Router();

authRouter.post("/sign-up", newUserMiddleware, insertNewUser);
authRouter.post("/sign-in", loginMiddleware, login);

export default authRouter;