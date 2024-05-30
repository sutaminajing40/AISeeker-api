import { Router } from 'express'
import { registPdf } from './registPdf'
import { deletePdf } from './deletePdf'

const router = Router()

router.post('/', registPdf)
router.delete('/', deletePdf)

export default router
