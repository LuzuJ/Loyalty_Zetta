"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_1 = require("./swagger");
const qualificationRoutes_1 = __importDefault(require("./routes/qualificationRoutes")); // Asegúrate de que este sea el nombre correcto del archivo y exportación
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express_1.default.json());
// Configura Swagger
(0, swagger_1.setupSwagger)(app);
// Configura las rutas
app.use('/api', qualificationRoutes_1.default); // Usa el enrutador para manejar las rutas bajo '/api'
// Middleware para manejar rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});
// Middleware para manejo de errores
app.use((err, req, res, next) => {
    (0, errorHandler_1.handleError)(res, 500, 'Something went wrong');
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
