import { Router } from 'express';
import { newTestController } from '../controllers/examsController';
import { newExamsMiddleware } from '../middlewares/examsMiddlewares';


const examsRouter = Router();

examsRouter.post("/tests/new", newExamsMiddleware, newTestController);
examsRouter.get("/tests/discipline");
examsRouter.get("/tests/teacher");

export default examsRouter;