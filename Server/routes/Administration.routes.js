import {Router} from "express";
import { SaveLabName,LabNameData,SaveLogo,getLogo } from "../controllers/Administration.controller.js";
import upload from "../middlewares/multer.middleware.js";
const router=Router()

router.post('/NameOfLab/save',SaveLabName)
router.get('/NameOfLab/data',LabNameData)
router.get('/Logo/data',getLogo)
router.post("/Logo/save",upload.single("logo"), SaveLogo);
export default router