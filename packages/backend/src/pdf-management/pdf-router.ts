import { Router } from 'express'
import { registPdf } from './operations/regist-pdf'
import { deletePdf } from './operations/delete-pdf'

const router = Router()

router.post('/', registPdf)
router.delete('/', deletePdf)

export default router
