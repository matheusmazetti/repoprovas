import app from '../src/index.js';
import supertest from 'supertest';
import prisma from '../src/database.js';
import bcrypt from 'bcrypt';

beforeAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
    await prisma.$executeRaw`TRUNCATE TABLE tests CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE categories CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE disciplines CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE terms CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE teachers CASCADE;`;
    const userData = {
        email: "test@test.com",
        password: bcrypt.hashSync("teste", 10)
    }
    await prisma.users.create({
        data: userData
    });
    await prisma.terms.create({
        data: {
            number: 1
        }
    })
    await prisma.$executeRaw`
    INSERT INTO categories ("name") VALUES ('Projeto');
    `
    await prisma.$executeRaw`
    INSERT INTO teachers ("name") VALUES ('Diego Pinho');
    `
});

const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIyLCJpYXQiOjE2NTg3NzU4NDV9.AYlqFL4rqqRM8kePLyFDoNMgDjugXqRfdTwwARTJ6WI';

describe("POST /tests/new", () => {
    it("recive 201 with correct params", async () => {
        await prisma.disciplines.create({
            data: {
                name: "HTML e CSS",
                termId: 1
            }
        })
        
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
})

afterAll(async () => {
    await prisma.$disconnect();
});