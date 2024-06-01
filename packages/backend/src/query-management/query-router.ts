import { Router } from 'express'

import { sendQuery } from './operations/send-query'

const router = Router()

router.post('/', sendQuery)

export default router
