import {Router} from "express";
import { ErrorAdd, FetchError,DeleteError } from "../controllers/Error.controller.js";

const router=Router()

router.post('/add',ErrorAdd)
router.get('/data',FetchError)
router.delete('/delete/:id',DeleteError)
export default router;