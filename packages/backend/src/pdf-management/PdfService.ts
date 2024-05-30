import fs from 'fs'
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { FaissStore } from '@langchain/community/vectorstores/faiss'
import { OpenAIEmbeddings } from '@langchain/openai'
import { PDF_SAVE_DIR, FAISS_INDEX_DIR } from '../utils/constants'

export class PdfService {
  private pdfSaveDir = PDF_SAVE_DIR
  private faissIndexDir = FAISS_INDEX_DIR

  constructor() {
    if (!fs.existsSync(this.pdfSaveDir)) {
      fs.mkdirSync(this.pdfSaveDir, { recursive: true })
    }
    if (!fs.existsSync(this.faissIndexDir)) {
      fs.mkdirSync(this.faissIndexDir, { recursive: true })
    }
  }

  public savePdf(fileName: string, pdfFileData: Buffer): string {
    const pdfSavePath = `${this.pdfSaveDir}/${fileName}`
    if (fs.readdirSync(this.pdfSaveDir).includes(fileName)) {
      throw new Error('このPDFはすでに登録されています。')
    }
    fs.writeFileSync(pdfSavePath, pdfFileData)
    return pdfSavePath
  }

  public async processPdf(pdfSavePath: string): Promise<void> {
    const loader = new PDFLoader(pdfSavePath)
    const docs = await loader.load()
    const faissIndexPath = `${this.faissIndexDir}/faiss.index`

    if (fs.existsSync(faissIndexPath)) {
      const vectorStore = await FaissStore.load(
        this.faissIndexDir,
        new OpenAIEmbeddings(),
      )
      await vectorStore.addDocuments(docs)
      await vectorStore.save(this.faissIndexDir)
    } else {
      const vectorStore = await FaissStore.fromDocuments(
        docs,
        new OpenAIEmbeddings(),
      )
      await vectorStore.save(this.faissIndexDir)
    }
  }
}
