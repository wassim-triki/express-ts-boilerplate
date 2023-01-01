import express from 'express';
import { verifyEmail } from '../controllers/email-verification.controller';

const router = express.Router();

router.get('/verify-email/:emailVerificationToken', verifyEmail);

export default router;
