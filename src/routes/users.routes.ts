import express, { Request, Response } from 'express';
import { getUsers, register } from '../controllers/user.controller';
import { errorMiddleware } from '../middlewares/errorMiddleware';

const router = express.Router();

router.get('/', getUsers);
router.post('/', register);

export default router;
