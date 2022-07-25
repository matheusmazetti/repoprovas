import { Router } from 'express';
import { newTestController, testTests } from '../controllers/examsController.js';
import { newExamsMiddleware } from '../middlewares/examsMiddlewares.js';


const examsRouter = Router();

examsRouter.post("/tests/new", newExamsMiddleware, newTestController);
examsRouter.get("/tests/discipline", testTests);
examsRouter.get("/tests/teacher");

export default examsRouter;