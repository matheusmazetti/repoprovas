import app from '../src/index.js';
import supertest from 'supertest';
import prisma from '../src/database.js';
import bcrypt from 'bcrypt';

beforeAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
    await prisma.$executeRaw`TRUNCATE TABLE tests;`;
    const userData = {
        email: "test@test.com",
        password: bcrypt.hashSync("teste", 10)
    }
    await prisma.users.create({
        data: userData
    });
});
const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIyLCJpYXQiOjE2NTg3NzU4NDV9.AYlqFL4rqqRM8kePLyFDoNMgDjugXqRfdTwwARTJ6WI';

describe("POST /tests/new", () => {
    it("recive 201 with correct params", async () => {        
        let testObject = {
            name: "test",
            pdfUrl: "www.google.com/alala.pdf",
            category: "Projeto",
            discipline: "HTML e CSS",
            teacher: "Diego Pinho"
        }
        let result = await supertest(app).post("/tests/new").send(testObject).set('Authorization', validToken);
        let status = result.status;

        expect(status).toEqual(201);
    });

    it("recive 422 with wrong object", async () => {
        let testObject = {
            name: "test",
            pdfUrl: "www.google.com/alala.pdf",
            category: "Projeto",
            discipline: "HTML e CSS"
            
        }
        let result = await supertest(app).post("/tests/new").send(testObject).set('Authorization', validToken);
        let status = result.status;

        expect(status).toEqual(422);
    });

    it("recive 401 without send token",async () => {
        let testObject = {
            name: "test",
            pdfUrl: "www.google.com/alala.pdf",
            category: "Projeto",
            discipline: "HTML e CSS",
            teacher: "Diego Pinho"
        }
        let result = await supertest(app).post("/tests/new").send(testObject);
        let status = result.status;

        expect(status).toEqual(401);
    });

    it("recive 409 when teacher, category or discipline does not exist", async () => {
        let testObject = {
            name: "test",
            pdfUrl: "www.google.com/alala.pdf",
            category: "Projeto",
            discipline: "HTML e CSS",
            teacher: "Diego"
        }
        let result = await supertest(app).post("/tests/new").send(testObject).set('Authorization', validToken);
        let status = result.status;

        expect(status).toEqual(409);
    });
})

describe("GET /tests/discipline", () => {
    it("recive tests object", async () => {
        let result = await supertest(app).get("/tests/discipline").set('Authorization', validToken);
        expect(result.body);
    });

    it("recive 401 not sending token", async () => {
        let result = await supertest(app).get("/tests/discipline")
        expect(result.status).toEqual(401);
    });
});

describe("GET /tests/teacher", () => {
    it("recive tests object", async () => {
        let result = await supertest(app).get("/tests/teacher").set('Authorization', validToken);
        expect(result.body);
    });

    it("recive 401 not sending token", async () => {
        let result = await supertest(app).get("/tests/teacher")
        expect(result.status).toEqual(401);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});