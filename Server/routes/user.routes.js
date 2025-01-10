import {Router} from "express";
import { Login,Register,Logout, UserData, changePassword } from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router=Router()

router.post('/register',Register)
router.post('/login',Login)
router.post('/Change-Password',isLoggedIn,changePassword)
router.get('/data',UserData)
router.get('/logout',Logout)
export default router
