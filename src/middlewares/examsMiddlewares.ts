import { NextFunction, Request, Response } from "express";
import { newTestSchema } from "../schemas/examsSchemas.js";
import { testsServices } from "../services/testsServices.js";
import { tokenServices } from "../services/tokenServices.js";


export async function newExamsMiddleware(req: Request, res: Response, next: NextFunction) {
    let body = req.body;
    const token = req.headers.authorization?.replace("Bearer", "").trim();
    let { error } = newTestSchema.validate(body);
    if(error){
        throw {status: 422, message: "wrong object"}
    }
    if(!token){
        throw {status: 401, message: "without token"}
    }
    let tokenData = await tokenServices.getDataFromToken(token);
    if(!tokenData){
        throw {status: 401, message: "invalid token"}
    }
    let categoryCheck = await testsServices.checkCategory(body.category);
    let teacherCheck = await testsServices.teacherCheck(body.teacher);
    let disciplineCheck = await testsServices.disciplineCheck(body.discipline);
    if(categoryCheck && teacherCheck && disciplineCheck){
        next();
    }
}