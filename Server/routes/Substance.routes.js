import {Router} from "express"
import { SubstanceAdd, SubstanceData,SubstanceDelete,SubstanceEdit } from "../controllers/Substance.controller.js"
const router=Router()

router.post('/add',SubstanceAdd)
router.get('/data',SubstanceData)
router.get('/edit',SubstanceEdit)
router.delete('/delete/:id',SubstanceDelete)
export default router;