import {Router} from "express"
import { SubstanceAdd, SubstanceData,SubstanceEdit } from "../controllers/Substance.controller.js"
const router=Router()

router.post('/add',SubstanceAdd)
router.get('/data',SubstanceData)
router.get('/edit',SubstanceEdit)
export default router;