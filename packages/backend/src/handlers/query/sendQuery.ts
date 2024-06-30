import { Request, Response } from 'express'

import { QueryService } from '../../services/QueryService'

export async function sendQuery(req: Request, res: Response) {
  if (!req.body.query) {
    return res.status(400).send('クエリがありません。')
  }

  //TODO: クエリの型を定義する
  const query = req.body.query as string
  const queryService = new QueryService()

  try {
    const result = await queryService.sendQuery(query)
    res.status(200).send(result)
  } catch (err) {
    res.status(400).send(err)
    console.error('Query Error:', err)
  }
}
