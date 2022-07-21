import { Request, Response } from "express";
import { insertUser } from "../repositories/authRepositories.js";
import { passwordServices } from "../services/passwordServices.js";

export async function insertNewUser(req: Request, res: Response){
    let userData = req.body;
    let hashPassword = passwordServices.hashPassword(userData.password);
    let newData = {
        email: userData.email,
        password: hashPassword
    }
    await insertUser(newData);
    res.sendStatus(201);
}