import express from 'express';
import { setupSwagger } from './swagger';
import qualificationRoutes from './routes/qualificationRoutes'; // Asegúrate de que este sea el nombre correcto del archivo y exportación
import { handleError } from './middlewares/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Configura Swagger
setupSwagger(app);

// Configura las rutas
app.use('/api', qualificationRoutes); // Usa el enrutador para manejar las rutas bajo '/api'

// Middleware para manejar rutas no encontradas (404)
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({ message: 'Not Found' });
});

// Middleware para manejo de errores
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  handleError(res, 500, 'Something went wrong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
