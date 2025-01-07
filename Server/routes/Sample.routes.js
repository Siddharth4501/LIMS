import {Router} from "express";
import { SampleRegister,SampleData,SampleEdit,TMDataSave, TMANData,TMANDataUpdate } from "../controllers/Sample.controller.js";
const router=Router()

router.post('/register',SampleRegister)
router.post('/TM/data/save',TMDataSave)
router.get('/TMAN/data',TMANData)
router.get('/data',SampleData)
router.put('/edit',SampleEdit)
router.put('/TMAN/data/update',TMANDataUpdate)
export default router;
