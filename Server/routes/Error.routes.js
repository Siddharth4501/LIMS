import {Router} from "express";
import { ErrorAdd, FetchError } from "../controllers/Error.controller";

const router=Router()

router.post('/add',ErrorAdd)
router.get('/data',FetchError)
export default router;