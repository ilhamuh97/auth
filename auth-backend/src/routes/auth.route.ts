import { Router } from 'express';

import { forgotPassword, login, logout, resetPassword, signup, verifyEmail, checkAuth } from '../controllers/auth.controller';
import { protectRoute } from '../middlewares/auth.middleware';

const router = Router();

router.get("/check-auth", protectRoute, checkAuth);

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

router.post("/verify-email", protectRoute, verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);


export default router;