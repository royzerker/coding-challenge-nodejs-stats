import { Request, Response } from 'express'
import { Inject, Service } from 'typedi'
import { StatsService } from '../services/stats.service'

@Service()
export class StatsController {
	#_statsService: StatsService

	constructor(@Inject() statsService: StatsService) {
		this.#_statsService = statsService
	}

	async getStats(req: Request, res: Response): Promise<void> {
		const { Q, R } = req.body

		if (!Q || !R) {
			res.status(400).json({ error: 'Q and R matrices are required' })
		}

		const statsQ = this.#_statsService.getStats(Q)
		const statsR = this.#_statsService.getStats(R)

		res.json({
			stats: { Q: statsQ, R: statsR }
		})
	}
}
