"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const zod_1 = require("zod");
// Helper para validar con Zod
const validateWithSchema = (schema, data) => {
    try {
        schema.parse(data);
        return { valid: true, data };
    }
    catch (error) {
        return { valid: false, errors: error.errors };
    }
};
const qualificationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    score: zod_1.z.number().min(0).max(100),
});
// Creacion del servidor usando HTTP
const server = (0, http_1.createServer)((req, res) => {
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
    }
    else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});
server.listen(3000, () => {
    console.log('Server running on port 3000');
});
