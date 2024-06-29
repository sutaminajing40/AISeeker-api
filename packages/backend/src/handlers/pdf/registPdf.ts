import fs from 'fs'

import { Request, Response } from 'express'

import { PdfService } from '../PdfService'

export async function registPdf(req: Request, res: Response) {
  if (!req.files || !req.files.pdf) {
    return res.status(400).send('PDFファイルがありません。')
  }

  const pdfFile = req.files.pdf
  if (Array.isArray(pdfFile) || pdfFile.mimetype !== 'application/pdf') {
    return res
      .status(400)
      .send('不正なコンテンツタイプです。application/pdfである必要があります。')
  }

  const fileName = pdfFile.name
  const pdfFileData = pdfFile.data
  const pdfService = new PdfService()

  try {
    const pdfSavePath = pdfService.savePdf(fileName, pdfFileData)
    try {
      await pdfService.processPdf(pdfSavePath)
      res.send('PDFの登録が完了しました')
    } catch (processErr: any) {
      // 処理中にエラーが発生した場合、保存したPDFファイルを削除する
      fs.unlinkSync(pdfSavePath)
      res.status(500).send('PDFの処理に失敗しました。')
      console.error('Process Error:', processErr)
    }
  } catch (saveErr: any) {
    res.status(409).send('このPDFはすでに登録されています。')
  }
}
