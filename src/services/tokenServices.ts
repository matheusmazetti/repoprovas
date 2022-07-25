import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

async function newToken(userId: number) {
    let userData = {userId: userId}
    let token = jwt.sign(userData, process.env.JWT_SECRET);
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

