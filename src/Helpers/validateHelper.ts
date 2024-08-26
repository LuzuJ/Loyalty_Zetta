import { createServer, IncomingMessage, ServerResponse } from 'http';
import { z, ZodSchema } from 'zod';

// Helper para validar con Zod
const validateWithSchema = (schema: ZodSchema<any>, data: any) => {
  try {
    schema.parse(data);
    return { valid: true, data };
  } catch (error: any) {
    return { valid: false, errors: error.errors };
  }
};

const qualificationSchema = z.object({
  name: z.string(),
  score: z.number().min(0).max(100),
});

// Creacion del servidor usando HTTP
const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  // Manejo de la solicitud POST a la ruta '/qualifications'
  if (req.method === 'POST' && req.url === '/qualifications') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const parsedBody = JSON.parse(body);
      const validationResult = validateWithSchema(qualificationSchema, parsedBody);

      if (!validationResult.valid) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
          status: 400,
          message: 'Error de validación',
          errors: validationResult.errors,
        }));
        return;
      }

      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        status: 201,
        message: 'Calificación creada correctamente',
        response: validationResult.data,
      }));
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
