import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

const app = express();

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mi API',
      version: '1.0.0',
      description: 'Documentación de la API hecha por Loyalty en TypeScript...'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local'
      }
    ],
  },
  apis: ['./src/routes/*.ts'], // Ruta a tus archivos de rutas
};

const specs = swaggerJsdoc(swaggerOptions);

// Imprime la especificación generada para depuración
console.log(JSON.stringify(specs, null, 2));

// Middleware para servir la documentación Swagger
export const setupSwagger = (app: express.Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
