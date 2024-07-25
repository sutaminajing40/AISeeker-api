declare module 'pdf-parse/lib/pdf.js/v1.10.100/build/pdf.js' {
  export const getDocument: any
}

declare module 'pickleparser' {
  export const Parser: any
  export const NameRegistry: any
}

declare module '@langchain/community/document_loaders/fs/pdf' {
  export class PDFLoader {
    constructor(filePath: string)
    load(): Promise<any[]>
  }
}

declare module 'express-fileupload' {
  import { Request } from 'express'

  interface FileArray {
    [fieldname: string]: UploadedFile | UploadedFile[]
  }

  interface UploadedFile {
    name: string
    mv(path: string, callback: (err: any) => void): void
    mv(path: string): Promise<void>
    encoding: string
    mimetype: string
    data: Buffer
    tempFilePath: string
    truncated: boolean
    size: number
    md5: string
  }

  global {
    namespace Express {
      interface Request {
        files?: FileArray
      }
    }
  }
}

declare module 'aws-lambda-multipart-parser' {
  export function parse(event: any, spotText?: boolean): any
  // 必要に応じて他の関数や型を追加
}
