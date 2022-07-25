import { getCategory, getDiscipline, getTeacher } from "../repositories/examsRepositories.js";



async function checkCategory(categoryName: string) {
    let categoryCheck = await getCategory(categoryName);
    if(!categoryCheck){
        throw {status: 409, message: "category not found"}
    }

    return true;
}

async function teacherCheck(name: string) {
    let teacher = await getTeacher(name);
    if(!teacher){
        throw {status: 409, message: "teacher not found"}
    }

    return true;
}

async function disciplineCheck(name: string) {
    let discipline = await getDiscipline(name);
    if(!discipline){
        throw {status: 409, message: "discipline not found"}
    }

    return true;
}

export const testsServices = {
    checkCategory,
    teacherCheck,
    disciplineCheck
}