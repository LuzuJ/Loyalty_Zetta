"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQualification = exports.updateQualifications = exports.createQualifications = exports.getAllQualifications = exports.getQualificationsByID = exports.getQualificationsIDs = void 0;
const zod_1 = require("zod");
const qualificationService_1 = require("../services/qualificationService");
// Esquemas para validar el ID, lo transforma de string a número
const idSchema = zod_1.z.string().transform((val) => parseInt(val, 10)).refine((val) => !isNaN(val), {
    message: 'El ID proporcionado no es válido',
});
// Define el qualificationSchema
const qualificationSchema = zod_1.z.object({
    donationId: zod_1.z.string(),
    donatorId: zod_1.z.string(),
    organizationId: zod_1.z.string(),
    generalScore: zod_1.z.number().min(0).max(5),
    notes: zod_1.z.string(),
    qualityCalification: zod_1.z.object({
        score: zod_1.z.number().min(0).max(5),
        comments: zod_1.z.string(),
    }),
    timeCalification: zod_1.z.object({
        score: zod_1.z.number().min(0).max(5),
        comments: zod_1.z.string(),
    }),
    packagingCalification: zod_1.z.object({
        score: zod_1.z.number().min(0).max(5),
        comments: zod_1.z.string(),
    }),
    communicationCalification: zod_1.z.object({
        score: zod_1.z.number().min(0).max(5),
        comments: zod_1.z.string(),
    }),
});
const getQualificationsIDs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const qualificationsIDs = yield (0, qualificationService_1.getQualificationsIDs)();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            status: 200,
            message: 'IDs obtenidos correctamente',
            response: qualificationsIDs,
        }));
    }
    catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({
            status: 500,
            message: 'Error al obtener las IDs',
        }));
    }
});
exports.getQualificationsIDs = getQualificationsIDs;
const getQualificationsByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = new URL(req.url || '', `http://${req.headers.host}`);
        const id = url.pathname.split('/').pop() || '';
        const parsedId = idSchema.parse(id);
        const qualifications = yield (0, qualificationService_1.getQualificationsByID)(parsedId);
        if (!qualifications) {
            res.statusCode = 404;
            return res.end(JSON.stringify({
                status: 404,
                message: 'No se encontraron calificaciones con el ID proporcionado',
            }));
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            status: 200,
            message: 'Calificación obtenida correctamente',
            response: qualifications,
        }));
    }
    catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({
            status: 500,
            message: 'Error al obtener la calificación',
            errors: error.message || 'Error interno del servidor',
        }));
    }
});
exports.getQualificationsByID = getQualificationsByID;
const getAllQualifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const qualifications = yield (0, qualificationService_1.getAllQualifications)();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            status: 200,
            message: 'Todas las calificaciones obtenidas correctamente',
            response: qualifications,
        }));
    }
    catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({
            status: 500,
            message: 'Error al obtener las calificaciones',
        }));
    }
});
exports.getAllQualifications = getAllQualifications;
const createQualifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield parseRequestBody(req);
        const parsedData = qualificationSchema.parse(data);
        const newQualifications = yield (0, qualificationService_1.createQualifications)(parsedData);
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            status: 201,
            message: 'Calificación creada correctamente',
            response: newQualifications,
        }));
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            const simplifiedErrors = error.errors.map((err) => ({
                path: err.path.join('.'),
                message: `${err.path.join('.')} es incorrecta`,
            }));
            res.statusCode = 400;
            res.end(JSON.stringify({
                status: 400,
                message: 'Error al crear la calificación',
                errors: simplifiedErrors,
            }));
        }
        else {
            res.statusCode = 500;
            res.end(JSON.stringify({
                status: 500,
                message: 'Error interno del servidor',
            }));
        }
    }
});
exports.createQualifications = createQualifications;
const updateQualifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = new URL(req.url || '', `http://${req.headers.host}`);
        const id = url.pathname.split('/').pop() || '';
        const parsedId = idSchema.parse(id);
        const data = yield parseRequestBody(req);
        const parsedData = qualificationSchema.partial().parse(data);
        const updatedQualification = yield (0, qualificationService_1.updateQualifications)(parsedId, parsedData);
        if (!updatedQualification) {
            res.statusCode = 404;
            return res.end(JSON.stringify({
                status: 404,
                message: 'No se puede actualizar, el ID no existe',
            }));
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            status: 200,
            message: 'Datos actualizados correctamente',
            response: updatedQualification,
        }));
    }
    catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({
            status: 500,
            message: 'Error al actualizar la calificación',
            errors: error.message || 'Error interno del servidor',
        }));
    }
});
exports.updateQualifications = updateQualifications;
const deleteQualification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = new URL(req.url || '', `http://${req.headers.host}`);
        const id = url.pathname.split('/').pop() || '';
        const parsedId = idSchema.parse(id);
        const deletedQualification = yield (0, qualificationService_1.deleteQualification)(parsedId);
        if (!deletedQualification) {
            res.statusCode = 404;
            return res.end(JSON.stringify({
                status: 404,
                message: 'No se puede eliminar, el ID no existe',
            }));
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            status: 200,
            message: 'Eliminación exitosa',
            response: deletedQualification,
        }));
    }
    catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({
            status: 500,
            message: 'Error al eliminar la calificación',
            errors: error.message || 'Error interno del servidor',
        }));
    }
});
exports.deleteQualification = deleteQualification;
const parseRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            }
            catch (error) {
                reject(error);
            }
        });
    });
};
