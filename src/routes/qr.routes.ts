import { Router } from 'express';
import { QrController } from '../controllers/qr.controller';
import { Container } from 'typedi';

const router = Router();

const qrController = Container.get(QrController);

/**
 * @swagger
 * /factorize:
 *   post:
 *     summary: Factoriza una matriz
 *     tags:
 *       - API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               matrix:
 *                 type: array
 *                 items:
 *                   type: array
 *                   items:
 *                     type: number
 *     responses:
 *       200:
 *         description: Matriz factorizada
 */
router.post('/factorize', (req, res) => qrController.factorize(req, res));



/**
 * @swagger
 * /rotate:
 *   post:
 *     summary: Rota una matriz
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               matrix:
 *                 type: array
 *                 items:
 *                   type: array
 *                   items:
 *                     type: number
 *     responses:
 *       200:
 *         description: Matriz rotada
 */
router.post('/rotate', (req, res) => qrController.rotate(req, res));

export default router;