import { Users } from "@prisma/client";
import prisma from "../database.js";

interface UserObject {
    email: string,
    password: string
}

export async function insertUser(userData: UserObject) {
    await prisma.users.create({
        data: userData
    });
}

export async function getUserByEmail(email: string) {
    let user = await prisma.users.findFirst({
        where: {
            email: email
        }
    });

    return user;
}