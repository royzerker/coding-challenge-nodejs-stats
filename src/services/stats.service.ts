import { Inject, Service } from 'typedi'
import { Logger } from 'winston'

@Service()
export class StatsService {
	#_logger: Logger

	constructor(@Inject('logger') logger: Logger) {
		this.#_logger = logger
	}

	getStats(matrix: number[][]): { sum: number; average: number } {
		this.#_logger.debug('Calculating stats for matrix:', matrix)

		const flat = matrix.flat()
		const sum = flat.reduce((acc, val) => acc + val, 0)
		const average = sum / flat.length
		return { sum, average }
	}

	rotateMatrix(matrix: number[][]): number[][] {
		this.#_logger.debug('Rotating matrix:', matrix)

		const n = matrix.length
		const m = matrix[0].length
		const rotated = Array.from({ length: m }, (_, i) => matrix.map(row => row[i]).reverse())
		return rotated
	}
}
