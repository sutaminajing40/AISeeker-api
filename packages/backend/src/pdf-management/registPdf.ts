import { Request, Response } from 'express';
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { OpenAIEmbeddings } from "@langchain/openai";
import fs from "fs";


export async function registPdf(req: Request, res: Response) {
    let fileName = '';
    let pdfFileData = Buffer.from('');

    if (!req.files || !req.files.pdf) {
        return res.status(400).send('PDF file is missing.');
    }
    const pdfFile = req.files.pdf;

    if (!Array.isArray(pdfFile)) {
        const fileType = pdfFile.mimetype;
        fileName = pdfFile.name;
        pdfFileData = pdfFile.data;
        if (fileType !== 'application/pdf') {
            return res.status(400).send('Incorrect content type. Expected application/pdf.');
        }
    }
    const pdfSaveDir = './data/pdfs';
    const pdfSavePath = `${pdfSaveDir}/${fileName}`;
    if (!fs.existsSync(pdfSaveDir)) {
        fs.mkdirSync(pdfSaveDir, { recursive: true });
    }

    const existingFiles = fs.readdirSync(pdfSaveDir);
    if (existingFiles.includes(fileName)) {
        return res.status(409).send('このPDFはすでに登録されています。');
    }

    try {
        fs.writeFileSync(pdfSavePath, pdfFileData);
        console.log('File saved to', pdfSavePath);
    } catch (err) {
        res.status(500).send('pdf登録に失敗しました。');
        console.error('Error saving file:', err);
        return;
    }

    const loader = new PDFLoader(pdfSavePath);
    const faissIndexDir = './data/faiss';
    if (!fs.existsSync(faissIndexDir)) {
        fs.mkdirSync(faissIndexDir, { recursive: true });
    }

    const docs = await loader.load(); // awaitを追加して非同期処理の結果を待つ
    const faissIndexPath = `${faissIndexDir}/faiss.index`;
    if (fs.existsSync(faissIndexPath)) {
        try {
            const vectorStore = await FaissStore.load(faissIndexDir, new OpenAIEmbeddings());
            await vectorStore.addDocuments(docs);
            await vectorStore.save(faissIndexDir);
            res.send('PDFの登録が完了しました');
        } catch (err) {
            res.status(500).send('faiss.indexの登録に失敗しました。');
            console.error('Error processing PDF:', err);
        }
    } else {
        try {
            const vectorStore = await FaissStore.fromDocuments(docs, new OpenAIEmbeddings());
            await vectorStore.save(faissIndexDir);
            res.send('PDFの登録が完了しました');
        } catch (err) {
            res.status(500).send('faiss.indexの登録に失敗しました。');
            console.error('Error processing PDF:', err);
        }
    }
}
