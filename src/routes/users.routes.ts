import express, { Request, Response } from 'express';
import { admin, auth, passwordReset } from '../controllers/user.controller';
import { authentication } from '../middlewares/authentication.middleware';
import { loginLimiter } from '../middlewares/loginLimiter.middleware';

const router = express.Router();

router.get('/', admin.getUsers);
router.post('/', auth.register);
router.get('/verify-email/:emailVerificationToken', auth.verifyEmail);
// router.post('/login', loginLimiter, login);
router.post('/login', auth.login);
router.post('/logout', authentication, auth.logout);
router.get('/me', authentication, auth.getLoggedinUser);
router.delete('/', admin.deleteUsers);
router.post('/reset-password', passwordReset.request);

export default router;
