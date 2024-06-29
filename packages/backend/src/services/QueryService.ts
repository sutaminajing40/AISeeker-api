import { StringOutputParser } from '@langchain/core/output_parsers'
import { pull } from 'langchain/hub'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents'

import { llm } from '../utils/models'
import { PdfService } from '../pdf-management/PdfService'

export class QueryService {
  public async sendQuery(query: string) {
    // ベクトルデータベースの読み込み
    const pdfService = new PdfService()
    const vectorStore = await pdfService.getVectorStore()

    // クエリを投げる
    const vectorStoreRetriever = vectorStore.asRetriever()
    const prompt = await pull<ChatPromptTemplate>('rlm/rag-prompt')

    const ragChain = await createStuffDocumentsChain({
      llm,
      prompt,
      outputParser: new StringOutputParser(),
    })

    const retrievedDocs = await vectorStoreRetriever.getRelevantDocuments(query)

    const result = await ragChain.invoke({
      question: query,
      context: retrievedDocs,
    })

    return result
  }
}
