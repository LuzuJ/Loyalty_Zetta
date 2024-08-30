import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import path from 'path';

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
      },
      {
        url: 'https://loyalty-zetta.vercel.app',
        description: 'Server desplegado en vercel'
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
  app.use('/api-docs', express.static(path.join(__dirname, 'public')));
};
