import swaggerJsdoc from 'swagger-jsdoc'

const PORT = process.env.PORT || 8000
const HOST = process.env.HOST || 'localhost'

const options: any = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'QR Factorization API',
			version: '1.0.0',
			description: 'API para factorizar matrices y realizar operaciones estadísticas.'
		},
		servers: [
			{
				url: `http://${HOST}:${PORT}/api`
			}
		]
	},
	apis: ['./src/routes/*.ts']
}

export const swaggerSpec = swaggerJsdoc(options)
