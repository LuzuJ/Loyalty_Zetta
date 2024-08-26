import { IncomingMessage, ServerResponse } from 'http';
import * as QualificationController from './qualificationController';

// Función que maneja las solicitudes HTTP y entura los controladores correctos
export const handleRequest = (req: IncomingMessage, res: ServerResponse) => {
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
            } else if (id) {
                QualificationController.getQualificationsByID(req, res);
            } else if (qualifications === 'qualificationsAll') {
                QualificationController.getAllQualifications(req, res);
            } else {
                res.statusCode = 404;
                res.end(JSON.stringify({ status: res.statusCode, message: 'Ruta no encontrada' }));
            }
            break;

        case 'POST':
            if (!id) {
                QualificationController.createQualifications(req, res);
            } else {
                res.statusCode = 404;
                res.end(JSON.stringify({ status: res.statusCode, message: 'Ruta no encontrada' }));
            }
            break;

        case 'PUT':
            if (id) {
                QualificationController.updateQualifications(req, res);
            } else {
                res.statusCode = 404;
                res.end(JSON.stringify({status: res.statusCode, message: 'Ruta no encontrada' }));
            }
            break;

        case 'DELETE':
            if (id) {
                QualificationController.deleteQualification(req, res);
            } else {
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
