import { Request, Response, NextFunction } from "express";

export async function errorHandling(error, req: Request, res: Response, next: NextFunction) {
    if(error.status && error.message){
        res.status(error.status).send(error.message)
    } else {
        console.log(error);
        res.sendStatus(500);
    }
}