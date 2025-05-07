import { Request, Response } from 'express'
import { Inject, Service } from 'typedi'
import { StatsService } from '../services/stats.service'

@Service()
export class StatsController {
	#_statsService: StatsService

	constructor(@Inject() statsService: StatsService) {
		this.#_statsService = statsService
	}

	async execute(req: Request, res: Response): Promise<void> {
		const { Q, R } = req.body

		if (!Q || !R) {
			res.status(400).json({ error: 'Q and R matrices are required' })
		}

		const rotatedQ = this.#_statsService.rotateMatrix(Q)
		const rotatedR = this.#_statsService.rotateMatrix(R)
		const statsQ = this.#_statsService.getStats(rotatedQ)
		const statsR = this.#_statsService.getStats(rotatedR)

		res.json({
			rotatedQ,
			rotatedR,
			stats: { Q: statsQ, R: statsR }
		})
	}
}
