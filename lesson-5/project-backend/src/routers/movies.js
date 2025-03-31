import {Router} from "express";

import { ctrlWrapper } from "../utils/ctrlWrapper.js";

import { getMoviesController, getMovieByIdController } from "../controllers/movies.js";

const moviesRouter = Router();

moviesRouter.get("/", ctrlWrapper(getMoviesController));

moviesRouter.get("/:id", ctrlWrapper(getMovieByIdController));

export default moviesRouter;