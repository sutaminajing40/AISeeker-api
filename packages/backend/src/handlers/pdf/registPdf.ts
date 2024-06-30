import fs from 'fs'

import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { Request, Response } from 'express'
import { UploadedFile, FileArray } from 'express-fileupload'

import { PdfService } from '../../services/PdfService'

export const handler: APIGatewayProxyHandler = async (event) => {
  const req = {
    files: event.files,
  } as Request & { files?: FileArray }
  const res = {
    status: (code: number) => ({
      send: (message: string) => ({
        statusCode: code,
        body: JSON.stringify({ message }),
      }),
    }),
  } as unknown as Response

  return registPdf(req, res)
}

export async function registPdf(
  req: Request & { files?: FileArray },
  res: Response,
): Promise<APIGatewayProxyResult> {
  if (!req.files || !('pdf' in req.files)) {
    return res
      .status(400)
      .send('PDFファイルがありません。') as unknown as APIGatewayProxyResult
  }

  const pdfFile = req.files.pdf as UploadedFile
  if (Array.isArray(pdfFile) || pdfFile.mimetype !== 'application/pdf') {
    return res
      .status(400)
      .send(
        '不正なコンテンツタイプです。application/pdfである必要があります。',
      ) as unknown as APIGatewayProxyResult
  }

  const fileName = pdfFile.name
  const pdfFileData = pdfFile.data
  const pdfService = new PdfService()

  try {
    const pdfSavePath = pdfService.savePdf(fileName, pdfFileData)
    try {
      await pdfService.processPdf(pdfSavePath)
      return res.send(
        'PDFの登録が完了しました',
      ) as unknown as APIGatewayProxyResult
    } catch (processErr: any) {
      // 処理中にエラーが発生した場合、保存したPDFファイルを削除する
      fs.unlinkSync(pdfSavePath)
      return res
        .status(500)
        .send('PDFの処理に失敗しました。') as unknown as APIGatewayProxyResult
    }
  } catch (saveErr: any) {
    return res
      .status(409)
      .send(
        'このPDFはすでに登録されています。',
      ) as unknown as APIGatewayProxyResult
  }
}
