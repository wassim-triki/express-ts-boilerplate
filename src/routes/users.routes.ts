import express, { Request, Response } from 'express';
import { getUsers, login, register } from '../controllers/user.controller';
import { errorMiddleware } from '../middlewares/errorMiddleware';
import { loginLimiter } from '../middlewares/loginLimiter';

const router = express.Router();

router.get('/', getUsers);
router.post('/', register);
router.post('/login', loginLimiter, login);

export default router;
