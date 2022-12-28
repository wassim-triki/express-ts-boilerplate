import express from 'express';
import { APIResponse } from '../interfaces/apiResponse.interface';
import { User } from '../interfaces/user.interface';

const router = express.Router();

const users: any = [];

router.get('/', (req, res) => {
  res.status(200).send(users);
});
router.post('/', (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = false;
    if (userExists) throw new Error('Email already in use.');
    const user: User = { email, password };
    const response: APIResponse = {
      ok: true,
      message: 'Signed up.',
      data: user,
    };
    res.status(201).json(response);
  } catch (err: any) {
    const response: APIResponse = {
      ok: false,
      message: err.message,
    };
    res.status(409).json(response);
  }
});

export default router;
