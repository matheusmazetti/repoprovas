import { Request, Response } from "express";
import { getCategory, getDiscipline, getTeacher, getTeacherDiscipline, newTest, ReciveTest } from "../repositories/examsRepositories.js";


export async function newTestController(req: Request, res: Response) {
    let body: ReciveTest = req.body;
    let category = await getCategory(body.category);
    let teacher = await getTeacher(body.teacher);
    let discipline = await getDiscipline(body.discipline);
    let teacherDiscipline = await getTeacherDiscipline(teacher.id, discipline.id);
    if(!teacherDiscipline){
        throw {status: 409, message: "teache/discipline relation not found"}
    }
    let testObject = {
        name: body.name,
        pdfUrl: body.pdfUrl,
        categoryId: category.id,
        teacherDisciplineId: teacherDiscipline.id
    }

    await newTest(testObject);
    res.sendStatus(201);
}