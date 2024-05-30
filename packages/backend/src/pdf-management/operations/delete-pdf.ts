import { Request, Response } from 'express'
import { PdfService } from '../PdfService'

export async function deletePdf(req: Request, res: Response) {
  try {
    const pdfService = new PdfService()
    pdfService.deletePdf()
    res.status(200).send('PDFの削除が完了しました。')
  } catch (err) {
    res.status(500).send('PDFの削除に失敗しました。')
    console.error('Delete Error:', err)
  }
}
