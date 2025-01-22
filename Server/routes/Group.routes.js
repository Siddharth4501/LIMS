import {Router} from "express";
import { GroupAdd, GroupData, GroupDelete, GroupUpdate,TestsDelete,TypeOfTestingDelete } from "../controllers/Group.controller.js";

const router=Router()

router.post('/add',GroupAdd)
router.get('/data',GroupData)
router.put('/update',GroupUpdate)
router.delete('/delete/:id',GroupDelete)
router.post('/TypeOfTesting/delete',TypeOfTestingDelete)
router.post('/Test/delete',TestsDelete)
export default router;