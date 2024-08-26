"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreate = void 0;
const zod_1 = require("zod");
// Definir el esquema de validación con Zod
const idSchema = zod_1.z.object({
    id: zod_1.z.string().transform(val => parseInt(val, 10)).refine(val => !isNaN(val), {
        message: 'El ID proporcionado no es válido',
    }),
});
const qualificationSchema = zod_1.z.object({
    donationId: zod_1.z.string(),
    donatorId: zod_1.z.string(),
    organizationId: zod_1.z.string(),
    generalScore: zod_1.z.number().int().min(1).max(10),
    notes: zod_1.z.string().optional(),
    qualityCalification: zod_1.z.object({
        score: zod_1.z.number().int().min(1).max(5),
        comments: zod_1.z.string().optional(),
    }).optional(),
    timeCalification: zod_1.z.object({
        score: zod_1.z.number().int().min(1).max(5),
        comments: zod_1.z.string().optional(),
    }).optional(),
    packagingCalification: zod_1.z.object({
        score: zod_1.z.number().int().min(1).max(5),
        comments: zod_1.z.string().optional(),
    }).optional(),
    communicationCalification: zod_1.z.object({
        score: zod_1.z.number().int().min(1).max(5),
        comments: zod_1.z.string().optional(),
    }).optional(),
});
// Middleware para validar el cuerpo de la solicitud
const validateCreate = (req, res, next) => {
    try {
        // Validar el cuerpo de la solicitud
        qualificationSchema.parse(req.body);
        // Validar las claves permitidas
        const allowedKeys = [
            'donationId',
            'donatorId',
            'organizationId',
            'generalScore',
            'notes',
            'qualityCalification',
            'timeCalification',
            'packagingCalification',
            'communicationCalification',
        ];
        // Claves no permitidas
        const invalidKeys = Object.keys(req.body).filter(key => !allowedKeys.includes(key));
        if (invalidKeys.length > 0) {
            res.status(400).json({
                status: 400,
                message: `Claves no permitidas encontradas: ${invalidKeys.join(', ')}`,
            });
            return;
        }
        next();
    }
    catch (error) {
        let errorMessage = 'Error en los datos proporcionados';
        if (error instanceof zod_1.z.ZodError) {
            errorMessage = error.errors.map(e => e.message).join(', ');
        }
        res.status(400).json({
            status: 400,
            message: 'Error de validación',
            errors: errorMessage,
        });
    }
};
exports.validateCreate = validateCreate;
