import express, { Request, Response } from 'express';
import { getUsers, login, register } from '../controllers/user.controller';
import { authentication } from '../middlewares/authentication.middleware';
import { errorMiddleware } from '../middlewares/error.middleware';
import { loginLimiter } from '../middlewares/loginLimiter.middleware';

const router = express.Router();

router.get('/', authentication, getUsers);
router.post('/', authentication, register);
router.post('/login', loginLimiter, login);

export default router;
