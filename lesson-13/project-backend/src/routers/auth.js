import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';

import { authRegisterSchema, authLoginSchema, googleOAuthValidationSchema } from '../validation/auth.js';

import {
  registerController,
  verifyController,
  loginController,
  refreshController,
  logoutController,
  getGoogleOAuthLinkController,
  signUpOrLoginWithGoogleController,
} from '../controllers/auth.js';

const authRouter = Router();

// signup
authRouter.post(
  '/register',
  validateBody(authRegisterSchema),
  ctrlWrapper(registerController),
);

authRouter.get("/verify", ctrlWrapper(verifyController));

authRouter.post(
  '/login',
  validateBody(authLoginSchema),
  ctrlWrapper(loginController),
);

authRouter.post('/refresh', ctrlWrapper(refreshController));

authRouter.post('/logout', ctrlWrapper(logoutController));

authRouter.post('/get-google-oauth-link', ctrlWrapper(getGoogleOAuthLinkController));

authRouter.post('/login-with-google', validateBody(googleOAuthValidationSchema), ctrlWrapper(signUpOrLoginWithGoogleController));

export default authRouter;


// 1. Фронтенд запитує лінку для авторизації
// 2. Після кліку або переходу нза посиланням здійснюється вхід за допомогою гугла
// 3. Редирект на фронтенд із токеном, який нам дав гугла
// 4. Авторизація із цим токеном в нашій системі