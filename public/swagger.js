"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
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
    apis: ['./public/routes/*.js'], // Ruta a tus archivos de rutas
};
const specs = (0, swagger_jsdoc_1.default)(swaggerOptions);
// Imprime la especificación generada para depuración
console.log(JSON.stringify(specs, null, 2));
// Middleware para servir la documentación Swagger
const setupSwagger = (app) => {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
};
exports.setupSwagger = setupSwagger;
