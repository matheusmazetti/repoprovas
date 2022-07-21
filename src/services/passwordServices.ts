import bcrypt from 'bcrypt';

function hashPassword(password: string): string {
    let newPassword = bcrypt.hashSync(password, 10);
    return newPassword;
}

function verifyPassword(password: string, hashPassword: string) {
    if(!bcrypt.compareSync(password, hashPassword)){
        throw {status: 401, message: "wrong password"}
    }
    return true;
}

export const passwordServices = {
    hashPassword,
    verifyPassword
}

