import {Router} from "express"
import { SubstanceData,SubstanceEdit } from "../controllers/Substance.controller.js"
const router=Router()


router.get('/data',SubstanceData)
router.get('/edit',SubstanceEdit)
export default router;