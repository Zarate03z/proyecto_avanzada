import express, { Request, Response } from 'express';
import * as imparteController from '../controllers/imparteController';
import { imparte } from '../models/imparteModel';
const imparteRouter = express.Router();

imparteRouter.post('/', async (req: Request, res: Response) => {
    const newimparte: imparte = req.body;
    imparteController.create(newimparte, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(result.statusCode).json(result);
    });
});

imparteRouter.get('/', async (req: Request, res: Response) => {
    imparteController.getAll((err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(result.statusCode).json(result);
    });
});

imparteRouter.get('/:cod_a', async (req: Request, res: Response) => {
    const cod_a = parseInt(req.params.cod_a);
    imparteController.getById(cod_a, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(result.statusCode).json(result);
    });
});

imparteRouter.put('/:cod_e', async (req: Request, res: Response) => {
    const cod_e = parseInt(req.params.cod_a);
    
    const updatedimparte: imparte = { ...req.body, cod_e };
    imparteController.update(updatedimparte, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(result.statusCode).json(result);
    });
});

imparteRouter.delete('/:cod_a', async (req: Request, res: Response) => {
    const cod_a = parseInt(req.params.cod_a);   
    imparteController.remove(cod_a, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(result.statusCode).json(result);
    });
});

export { imparteRouter };