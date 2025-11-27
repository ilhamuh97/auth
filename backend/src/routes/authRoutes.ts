import { Router } from 'express';

const router = Router();

router.get("/", (req, res) => {
    res.send("Test auth route")
})

export default router;