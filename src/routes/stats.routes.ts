import { Router } from 'express'
import { Container } from 'typedi'
import { StatsController } from '../controllers/stats.controller'

const router = Router()

const statsController = Container.get(StatsController)
/**
 * @swagger
 * /stats/process:
 *   post:
 *     summary: Process a matrix
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Q:
 *                 type: array
 *                 items:
 *                   type: array
 *                   items:
 *                     type: number
 *               R:
 *                 type: array
 *                 items:
 *                   type: array
 *                   items:
 *                     type: number
 *     responses:
 *       200:
 *         description: Matrix processed successfully
 */
router.post('/stats/process', (req, res) => statsController.getStats(req, res))

export default router
