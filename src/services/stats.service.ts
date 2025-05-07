import { Inject, Service } from 'typedi'
import { Logger } from 'winston'

@Service()
export class StatsService {
	#_logger: Logger

	constructor(@Inject('logger') logger: Logger) {
		this.#_logger = logger
	}

	getStats(matrix: number[][]): { max: number; min: number; avg: number; sum: number; isDiagonal: boolean } {
		this.#_logger.debug('Calculating stats for matrix:', matrix)

		const flattened = matrix.flat()

		const max = Math.max(...flattened)
		const min = Math.min(...flattened)
		const avg = flattened.reduce((sum, value) => sum + value, 0) / flattened.length
		const sum = flattened.reduce((sum, value) => sum + value, 0)

		const isDiagonal = this.#_isDiagonal(matrix)

		return {
			max,
			min,
			avg,
			sum,
			isDiagonal
		}
	}

	#_isDiagonal(matrix: number[][]): boolean {
		this.#_logger.debug('Checking if matrix is diagonal:', matrix)

		const n = matrix.length
		for (let i = 0; i < n; i++) {
			for (let j = 0; j < n; j++) {
				if (i !== j && matrix[i][j] !== 0) {
					return false
				}
			}
		}
		return true
	}
}
