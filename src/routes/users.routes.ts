import express, { Request, Response } from 'express';
import {
  deleteUsers,
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

router.get('/', getUsers);
router.post('/', register);
// router.post('/login', loginLimiter, login);
router.post('/login', login);
router.post('/logout', authentication, logout);
router.get('/me', authentication, getCurrentUser);
router.delete('/', deleteUsers);

export default router;
