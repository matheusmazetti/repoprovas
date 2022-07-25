import { Request, Response } from "express";
import { getCategory, getDiscipline, getTeacher, getTestsByTeachers, getTestsByTermsAndDisciplines, newTest, ReciveTest } from "../repositories/examsRepositories.js";


export async function newTestController(req: Request, res: Response) {
    let body: ReciveTest = req.body;
    let category = await getCategory(body.category);
    let teacher = await getTeacher(body.teacher);
    let discipline = await getDiscipline(body.discipline);
    let testObject = {
        name: body.name,
        pdfUrl: body.pdfUrl,
        categoryId: category.id,
        teacherId: teacher.id,
        disciplineId: discipline.id
    }

    await newTest(testObject);
    res.sendStatus(201);
}

export async function getAllExamsByTeacher(req: Request, res: Response) {
    let tests = await getTestsByTeachers();
    res.send(tests);
}

export async function getAllExamsByTerms(req: Request, res: Response) {
    let results = await getTestsByTermsAndDisciplines();
    res.status(200).send(results);
}