import { NextFunction, Request, Response } from "express";
import { getUserByEmail } from "../repositories/authRepositories.js";
import { loginSchema, newUserSchema } from "../schemas/userSchemas.js";


export async function newUserMiddleware(req: Request, res: Response, next: NextFunction) {
    let body = req.body;
    let { error } = newUserSchema.validate(body);
    if(error || !body.confirmPassword){
        throw {status: 422, message: "invalid object"}
    }
    let userVerify = await getUserByEmail(body.email);
    if(userVerify){
        throw {status: 409, message: "conflict"}
    }
    next();    
}

export async function loginMiddleware(req: Request, res: Response, next: NextFunction) {
    let body = req.body;
    let { error } = loginSchema.validate(body);
    if(error){
        throw {status: 422, message: "invalid object"}
    }
    let userVerify = await getUserByEmail(body.email);
    if(!userVerify){
        throw {status: 401, message: "unregistered user"}
    }
    next();
}