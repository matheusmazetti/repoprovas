import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

async function newToken(userId: number) {
    let token = jwt.sign({userId: userId}, process.env.JWT_SECRET);
    return token;
}

async function getDataFromToken(token: string) {
    try{
        let userId = jwt.verify(token, process.env.JWT_SECRET);
        return userId.userId;
    } catch(e){
        throw {status: 401, message: "invalid token"}
    }
}

export const tokenServices = {
    newToken,
    getDataFromToken
}

