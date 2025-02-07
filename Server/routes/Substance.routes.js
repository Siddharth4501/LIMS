import {Router} from "express"
import { SubstanceAdd, SubstanceData,SubstanceDelete,SubstanceEdit } from "../controllers/Substance.controller.js"
const router=Router()

router.post('/add',SubstanceAdd)
router.post('/delete',SubstanceDelete)
router.get('/data',SubstanceData)
router.get('/edit',SubstanceEdit)
export default router;