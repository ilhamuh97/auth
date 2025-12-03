import { Router } from 'express';
import { login, logout, signup, verifyEmail } from '../controllers/auth.controller';
import { protectRoute } from '../middlewares/auth.middleware';

const router = Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

router.post("/verify-email", protectRoute, verifyEmail);


export default router;