"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
// Para manejar errores, funciona como un middleware de 'Express'
const handleError = (res, statusCode, message) => {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: statusCode, message }));
};
exports.handleError = handleError;
