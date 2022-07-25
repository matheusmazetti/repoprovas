import app from '../src/index.js';
import supertest from 'supertest';
import prisma from '../src/database.js'

beforeAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
});

describe("POST /sign-up",() => {
    it("return 201 with valid params", async () => {
        const body = {
            email: "matheus@matheus.com",
            password: "matheus",
            confirmPassword: "matheus"
        }

        let result = await supertest(app).post("/sign-up").send(body);
        let status = result.status;
        let newUser = await prisma.users.findUnique({
            where: {
                email: body.email
            }
        });

        expect(status).toEqual(201);
        expect(newUser).not.toBeNull();
    });

    it("return 422 with invalid params", async () => {
        let emailError = {
            email: "matheus",
            password: "matheus",
            confirmPassword: "matheus"
        }
        let passwordError = {
            email: "mazetti@matheus.com",
            password: "",
            confirmPassword: "matheus"
        }
        let wrongPassword = {
            email: "freitas@matheus.com",
            password: "matheus",
            confirmPassword: "matheu"
        }

        let resultEmail = await supertest(app).post("/sign-up").send(emailError);
        let status1 = resultEmail.status;
        let resultPass1 = await supertest(app).post("/sign-up").send(passwordError);
        let status2 = resultPass1.status;
        let resultPass2 = await supertest(app).post("/sign-up").send(wrongPassword);
        let status3 = resultPass2.status;

        expect(status1).toEqual(422);
        expect(status2).toEqual(422);
        expect(status3).toEqual(422);
    });

    it("returns 409 when the email is already registered", async () => {
        let body = {
            email: "test@test.com",
            password: "test",
            confirmPassword: "test"
        }

        let firstTry = await supertest(app).post("/sign-up").send(body);
        let firstStatus = firstTry.status;

        expect(firstStatus).toEqual(201);

        let secondTry = await supertest(app).post("/sign-up").send(body);
        let secondStatus = secondTry.status;

        expect(secondStatus).toEqual(409);
    })
})

afterAll(async () => {
    await prisma.$disconnect();
});