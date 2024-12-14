import {Router} from "express";
import { SampleRegister,SampleData,SampleEdit } from "../controllers/Sample.controller.js";
const router=Router()

router.post('/registration',SampleRegister)
router.get('/data',SampleData)
router.get('/edit',SampleEdit)
export default router;
