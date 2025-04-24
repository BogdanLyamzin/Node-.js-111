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
import { authenticate } from '../middlewares/authenticate.js';

import { validateBody } from '../utils/validateBody.js';

import { movieAddSchema, movieUpdateSchema } from '../validation/movies.js';
import { upload } from '../middlewares/multer.js';

const moviesRouter = Router();

moviesRouter.use(authenticate);

moviesRouter.get('/', ctrlWrapper(getMoviesController));

moviesRouter.get('/:id', isValidId, ctrlWrapper(getMovieByIdController));

moviesRouter.post('/', validateBody(movieAddSchema), ctrlWrapper(addMovieController));

moviesRouter.put('/:id', isValidId, validateBody(movieAddSchema), ctrlWrapper(upsertMovieController));

moviesRouter.patch('/:id', isValidId, upload.single('posterUrl'), validateBody(movieUpdateSchema), ctrlWrapper(patchMovieController));

moviesRouter.delete('/:id', isValidId, ctrlWrapper(deleteMovieController));

export default moviesRouter;
