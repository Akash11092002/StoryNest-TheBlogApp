import express from 'express';
import { getAlluser, login, signup } from '../controllers/User-controller';
const router= express.Router();

router.get("/",getAlluser);
router.post("/signup",signup)
router.post("/login",login)
export default router;