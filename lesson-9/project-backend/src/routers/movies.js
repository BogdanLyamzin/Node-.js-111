import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
  getMoviesController,
  getMovieByIdController,
  addMovieController,
  upsertMovieController,
  patchMovieController,
  deleteMovieController,
} from '../controllers/movies.js';

import { isValidId } from '../middlewares/isValidId.js';

import { validateBody } from '../utils/validateBody.js';

import { movieAddSchema, movieUpdateSchema } from '../validation/movies.js';

const moviesRouter = Router();

moviesRouter.get('/', ctrlWrapper(getMoviesController));

moviesRouter.get('/:id', isValidId, ctrlWrapper(getMovieByIdController));

moviesRouter.post('/', validateBody(movieAddSchema), ctrlWrapper(addMovieController));

moviesRouter.put('/:id', isValidId, validateBody(movieAddSchema), ctrlWrapper(upsertMovieController));

moviesRouter.patch('/:id', isValidId, validateBody(movieUpdateSchema), ctrlWrapper(patchMovieController));

moviesRouter.delete('/:id', isValidId, ctrlWrapper(deleteMovieController));

export default moviesRouter;
