import { Request, Response } from "express";
import { getUserByEmail, insertUser } from "../repositories/authRepositories.js";
import { passwordServices } from "../services/passwordServices.js";
import { tokenServices } from "../services/tokenServices.js";

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

export async function login(req: Request, res: Response) {
    let loginData = req.body;
    let userData = await getUserByEmail(loginData.email);
    let passwordVerify = passwordServices.verifyPassword(loginData.password, userData.password);
    if(!passwordVerify){
        throw {status: 401, message: "wrong password"}
    }
    let token = await tokenServices.newToken(userData.id);
    res.status(201).send(token);
}