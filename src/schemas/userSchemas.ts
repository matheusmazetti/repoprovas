import joi from 'joi';

export const newUserSchema = joi.object({
    email: joi.string().pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/).required(),
    password: joi.string().min(1).required(),
    confirmPassword: joi.ref('password')
});