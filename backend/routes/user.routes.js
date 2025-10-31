import express from 'express'
import { login, Logout, signup } from '../controllers/auth.controllers.js';


const router = express.Router();

router.post("/login",login);

router.post("/signup",signup)

router.post("/logout",Logout)


export default router