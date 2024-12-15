import {Router} from "express";
import { GroupAdd, GroupData, GroupUpdate } from "../controllers/Group.controller.js";

const router=Router()

router.post('/add',GroupAdd)
router.get('/data',GroupData)
router.get('/update',GroupUpdate)
export default router;