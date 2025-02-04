import {Router} from "express";
import { SampleRegister,SampleData,SampleEdit,TMDataSave, TMANData,TMANDataUpdate, DeleteSampleData,uploadFile } from "../controllers/Sample.controller.js";
import upload from "../middlewares/multer.middleware.js";
const router=Router()

router.post('/register',SampleRegister)
router.post('/TM/data/save',TMDataSave)
router.post('/File/Upload',upload.single("sampleDetailsFile"),uploadFile)
router.get('/TMAN/data',TMANData)
router.get('/data',SampleData)
router.post('/delete',DeleteSampleData)
router.put('/edit',SampleEdit)
router.put('/TMAN/data/update',TMANDataUpdate)
export default router;
