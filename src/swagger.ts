import swaggerJsdoc from 'swagger-jsdoc';

const PORT = process.env.PORT || 8000;

const options: any = { 
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'QR Factorization API',
      version: '1.0.0',
      description: 'API para factorizar matrices y realizar operaciones estadísticas.',
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api`,
      },
    ],
  },
  apis: ['./src/routes/*.ts'], 
};

export const swaggerSpec = swaggerJsdoc(options);
