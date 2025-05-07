import  { Request, Response, Router } from 'express';
import { QrService } from "../services/qr.service";
import { Inject, Service } from 'typedi';


@Service()
export class QrController {
  #_qaService: QrService;
  
    constructor(@Inject() qaService: QrService) {
      this.#_qaService = qaService;
    }

    async factorize(req: Request, res: Response): Promise<void> {

      const { matrix } = req.body;

      if (!matrix) {
        res.status(400).json({ error: 'Missing matrix' });
        return;
      }

      const response = await this.#_qaService.factorize(matrix)

      res.json({ Q: response.Q, R: response.R, stats: response.stats });
    }

    async rotate(req: Request, res: Response): Promise<void> {
      const { qMatrix, rMatrix } = req.body;

      const {
        rotatedQ,
        rotatedR
      } = await this.#_qaService.rotate(qMatrix, rMatrix)
      
      res.json({ rotatedQ, rotatedR });
    }

   
   
  }