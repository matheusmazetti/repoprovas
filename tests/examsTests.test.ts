import app from '../src/index.js';
import supertest from 'supertest';
import prisma from '../src/database.js';
import bcrypt from 'bcrypt';


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
})

afterAll(async () => {
    await prisma.$disconnect();
});