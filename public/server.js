"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const PORT = process.env.PORT || 3000;
// Crea el servidor
const server = (0, http_1.createServer)((req, res) => {
    // Aquí se manejarán las solicitudes, errores y respuestas
    if (req.method === 'POST' && req.url === '/qualifications') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const parsedBody = JSON.parse(body);
                // Aquí agregarías la validación con Zod si es necesario
                // Simulación de un proceso exitoso
                res.statusCode = 201;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                    status: 201,
                    message: 'Calificación creada correctamente',
                    response: parsedBody,
                }));
            }
            catch (error) {
                res.statusCode = 400;
                res.end(JSON.stringify({ message: 'Error de validación' }));
            }
        });
    }
    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
});
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
