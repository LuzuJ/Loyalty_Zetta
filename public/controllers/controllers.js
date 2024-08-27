"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRequest = void 0;
const QualificationController = __importStar(require("./qualificationController"));
// Función que maneja las solicitudes HTTP y entura los controladores correctos
const handleRequest = (req, res) => {
    // Desestructura los valores del metodo HTTP y el url 
    const { method, url } = req;
    // Mensaje de error si no hay una url 
    if (!url) {
        res.statusCode = 400;
        res.end(JSON.stringify({ status: res.statusCode, message: 'URL no proporcionada' }));
        return;
    }
    // Divide la URL en partes separadas por "/" y filtra cualquier parte vacía
    const urlParts = url.split('/').filter(Boolean);
    const [api, qualifications, id] = urlParts;
    // Verifica que la URL comience con "api" y que la segunda parte sea una de las rutas válidas
    if (api !== 'api' || (qualifications !== 'qualifications' && qualifications !== 'qualificationsIDs' && qualifications !== 'qualificationsAll')) {
        res.statusCode = 404;
        res.end(JSON.stringify({ status: res.statusCode, message: 'URL no válida' }));
        return;
    }
    switch (method) {
        case 'GET':
            if (qualifications === 'qualificationsIDs') {
                QualificationController.getQualificationsIDs(req, res);
            }
            else if (id) {
                QualificationController.getQualificationsByID(req, res);
            }
            else if (qualifications === 'qualificationsAll') {
                QualificationController.getAllQualifications(req, res);
            }
            else {
                res.statusCode = 404;
                res.end(JSON.stringify({ status: res.statusCode, message: 'Ruta no encontrada' }));
            }
            break;
        case 'POST':
            if (!id) {
                QualificationController.createQualifications(req, res);
            }
            else {
                res.statusCode = 404;
                res.end(JSON.stringify({ status: res.statusCode, message: 'Ruta no encontrada' }));
            }
            break;
        case 'PUT':
            if (id) {
                QualificationController.updateQualifications(req, res);
            }
            else {
                res.statusCode = 404;
                res.end(JSON.stringify({ status: res.statusCode, message: 'Ruta no encontrada' }));
            }
            break;
        case 'DELETE':
            if (id) {
                QualificationController.deleteQualification(req, res);
            }
            else {
                res.statusCode = 404;
                res.end(JSON.stringify({ status: res.statusCode, message: 'Ruta no encontrada' }));
            }
            break;
        default:
            res.statusCode = 405;
            res.end(JSON.stringify({ status: res.statusCode, message: 'Método no permitido' }));
            break;
    }
};
exports.handleRequest = handleRequest;
