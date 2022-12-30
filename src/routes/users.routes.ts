import express, { Request, Response } from 'express';
import {
  getCurrentUser,
  getUsers,
  login,
  logout,
  register,
} from '../controllers/user.controller';
import { authentication } from '../middlewares/authentication.middleware';
import { errorMiddleware } from '../middlewares/error.middleware';
import { loginLimiter } from '../middlewares/loginLimiter.middleware';

const router = express.Router();

router.get('/', authentication, getUsers);
router.post('/', authentication, register);
router.post('/login', loginLimiter, login);
router.post('/logout', authentication, logout);
router.get('/me', authentication, getCurrentUser);

export default router;
