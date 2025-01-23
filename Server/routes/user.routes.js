import {Router} from "express";
import { Login,Register,Logout, UserData, changePassword,DeleteUserData,DeleteUserRole } from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router=Router()

router.post('/register',Register)
router.post('/login',Login)
router.post('/Change-Password',isLoggedIn,changePassword)
router.post('/delete',DeleteUserData)
router.post('/role/delete',DeleteUserRole)
router.get('/data',UserData)
router.get('/logout',Logout)
export default router
