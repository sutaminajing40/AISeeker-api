import { Request, Response } from 'express';

export const ping = (req: Request, res: Response) => {
    console.log(typeof req, typeof res);
    res.send('Hello World!');
};
