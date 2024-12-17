import {Router} from "express";
import { Login,Register,Logout, UserData } from "../controllers/user.controller.js";

const router=Router()

router.post('/register',Register)
router.post('/login',Login)
router.get('/logout',Logout)
router.get('/data',UserData)
export default router
