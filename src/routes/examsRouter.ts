import { Router } from 'express';
import { getAllExamsByTerms, newTestController } from '../controllers/examsController.js';
import { getExamsMiddleware, newExamsMiddleware } from '../middlewares/examsMiddlewares.js';


const examsRouter = Router();

examsRouter.post("/tests/new", newExamsMiddleware, newTestController);
examsRouter.get("/tests/discipline", getExamsMiddleware, getAllExamsByTerms);
examsRouter.get("/tests/teacher", getExamsMiddleware);

export default examsRouter;