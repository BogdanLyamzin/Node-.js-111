import Joi from "joi";

import { typeList, minReleaseYear } from "../constants/movies.js";

export const movieAddSchema = Joi.object({
    title: Joi.string().required().messages({
        "any.required": "Треба вказати назву фільму",
        "string.base": "Назва фильму має бути строкою"
    }),
    director: Joi.string().required(),
    favorite: Joi.boolean(),
    type: Joi.string().valid(...typeList),
    releaseYear: Joi.number().min(minReleaseYear).required(),
});

export const movieUpdateSchema = Joi.object({
    title: Joi.string(),
    director: Joi.string(),
    favorite: Joi.boolean(),
    type: Joi.string().valid(...typeList),
    releaseYear: Joi.number().min(minReleaseYear),
});
