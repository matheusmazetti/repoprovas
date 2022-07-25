import joi from 'joi';


export const newTestSchema = joi.object({
    name: joi.string().min(1).required(),
    pdfUrl: joi.string().pattern(/^(https?:\/\/)?www\.([\da-z\.-]+)\.([a-z\.]{2,6})\/[\w \.-]+?\.pdf$/).required(),
    category: joi.string().min(1).required(),
    discipline: joi.string().min(1).required(),
    teacher: joi.string().min(1).required()
});