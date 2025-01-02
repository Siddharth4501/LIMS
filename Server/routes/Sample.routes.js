import {Router} from "express";
import { SampleRegister,SampleData,SampleEdit,TMDataSave } from "../controllers/Sample.controller.js";
const router=Router()

router.post('/register',SampleRegister)
router.post('/TM/data/save',TMDataSave)
router.get('/data',SampleData)
router.get('/edit',SampleEdit)
export default router;
