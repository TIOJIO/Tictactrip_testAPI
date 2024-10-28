// src/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tictactrip API',
      version: '1.0.0',
      description: 'API for text justification',
    },
    servers: [
      {
        url: 'https://tictactrip-26a03a519eb2.herokuapp.com/', // Remplacez par l'URL de votre API déployée sur Heroku
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Chemin des fichiers où vous documenterez vos endpoints
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
