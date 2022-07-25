import prisma from "../database.js";


interface TestObject {
    name: string,
    pdfUrl: string,
    categoryId: number,
    disciplineId: number,
    teacherId: number
}

export interface ReciveTest {
    name: string,
    pdfUrl: string,
    category: string,
    teacher: string,
    discipline: string
}

export async function newTest(testObject: TestObject) {
    await prisma.tests.create({
        data: testObject
    })
}

export async function getCategory(categoryName: string) {
    let category = await prisma.categories.findUnique({
        where: {
            name: categoryName
        }
    });

    return category;
}

export async function getTeacher(name: string) {
    let teacher = await prisma.teachers.findUnique({
        where: {
            name: name
        }
    });

    return teacher;
}

export async function getDiscipline(name: string) {
    let discipline = await prisma.disciplines.findUnique({
        where: {
            name: name
        }
    });

    return discipline;
}

export async function getTestsByTermsAndDisciplines() {
    let testsResponse = await prisma.terms.findMany({
        select:{
            number: true,
            Discipline: {
                select:{
                    name: true,
                    tests:{
                        select:{
                            id: true,
                            name: true,
                            pdfUrl: true,
                            categories: {
                                select:{
                                    name: true
                                }
                            },
                            teachers: {
                                select:{
                                    name: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    return testsResponse
}

export async function getTestsByTeachers() {
    let results = await prisma.teachers.findMany({
        select: {
            name: true,
            tests: {
                orderBy: {
                    categoryId: 'asc'
                },
                select:{
                    categories: {
                        select: {
                            name: true
                        }
                    },
                    name: true,
                    pdfUrl: true,
                    disciplines: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    })

    return results;
}