import { OpenAIEmbeddings, ChatOpenAI } from '@langchain/openai'
import dotenv from 'dotenv'
dotenv.config()

export const llm = new ChatOpenAI({
  model: 'gpt-3.5-turbo-0125',
  temperature: 0,
})
export const embeddings = new OpenAIEmbeddings({
  model: 'text-embedding-3-small',
})
