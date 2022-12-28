import express, { Request, Response } from 'express';
import { register } from '../controllers/user.controller';
import { errorMiddleware } from '../middlewares/errorMiddleware';

const router = express.Router();

const users: any = [];

router.get('/', (req, res) => {
  res.status(200).send(users);
});
router.post('/', register, errorMiddleware);

export default router;
