import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import 'reflect-metadata'

import swaggerUi from 'swagger-ui-express'

import { registerDependencies } from './loaders/dependency-injector'
registerDependencies()

import router from './routes/stats.routes'
import { swaggerSpec } from './swagger'

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/api', router)

app.listen(PORT, () => {
	console.log(`[server]: Server is running at http://localhost:${PORT}`)
})
