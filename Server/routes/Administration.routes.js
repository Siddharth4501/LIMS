import {Router} from "express";
import { SaveLabName,LabNameData } from "../controllers/Administration.controller.js";

const router=Router()

router.post('/NameOfLab/save',SaveLabName)
router.get('/NameOfLab/data',LabNameData)

export default router