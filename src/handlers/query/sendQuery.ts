import { APIGatewayProxyHandler } from 'aws-lambda'

import { QueryService } from '../../services/QueryService'

export const handler: APIGatewayProxyHandler = async (event) => {
  const query = JSON.parse(event.body || '{}').query
  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'クエリがありません。' }),
    }
  }

  const queryService = new QueryService()
  try {
    const result = await queryService.sendQuery(query)
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    }
  } catch (err) {
    console.error('Query Error:', err)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'クエリの処理に失敗しました。' }),
    }
  }
}
