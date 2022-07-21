import { NextFunction, Request, Response } from "express";
import { getUserByEmail } from "../repositories/authRepositories.js";
import { newUserSchema } from "../schemas/userSchemas.js";


export async function newUserMiddleware(req: Request, res: Response, next: NextFunction) {
    let body = req.body;
    let { error } = newUserSchema.validate(body);
    if(error){
        throw {status: 422, messsage: "invalid object"}
    }
    let userVerify = await getUserByEmail(body.email);
    if(userVerify){
        throw {status: 409, message: "conflict"}
    }
    next();    
}