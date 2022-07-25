import app from '../src/index.js';
import supertest from 'supertest';
import prisma from '../src/database.js';
import bcrypt from 'bcrypt';

beforeAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
    const userData = {
        email: "test@test.com",
        password: bcrypt.hashSync("teste", 10)
    }
    await prisma.users.create({
        data: userData
    });
});

describe("POST /sign-in", () => {
    it("recive a token when the informations is correct", async () => {
        let userObject = {
            email: "test@test.com",
            password: "teste"
        }

        let result = await supertest(app).post("/sign-in").send(userObject);
        let status = result.status;
        let token = result.text;
        expect(status).toEqual(201);
        expect(token).toMatch(/(^[\w-]*\.[\w-]*\.[\w-]*$)/)
    });

    it("recive 401 when the information is incorrect", async () => {
        let wrongPassword = {
            email: "test@test.com",
            password: "test"
        }

        let result = await supertest(app).post("/sign-in").send(wrongPassword);
        let status = result.status;

        expect(status).toEqual(401);
    });

    it("recive 422 when the object is wrong", async () => {
        let wrongObject = {
            email: "test@test.com"
        }

        let result = await supertest(app).post("/sign-in").send(wrongObject);
        let status = result.status;

        expect(status).toEqual(422);

    });
})

afterAll(async () => {
    await prisma.$disconnect();
});