import { Router } from 'express';
import { forgotPassword, login, logout, signup, verifyEmail } from '../controllers/auth.controller';
import { protectRoute } from '../middlewares/auth.middleware';

const router = Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

router.post("/verify-email", protectRoute, verifyEmail);
router.post("/forgot-password", protectRoute, forgotPassword);


export default router;