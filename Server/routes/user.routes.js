import {Router} from "express";
import { Login,Register,Logout, UserData } from "../controllers/user.controller.js";

const router=Router()

router.post('/register',Register)
router.post('/login',Login)
router.get('/data',UserData)
router.get('/logout',Logout)
export default router
