"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreate = void 0;
const zod_1 = require("zod");
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
        const invalidKeys = Object.keys(req.body).filter(key => !allowedKeys.includes(key));
        if (invalidKeys.length > 0) {
            return res.status(400).json({
                status: 400,
                message: `Claves no permitidas: ${invalidKeys.join(', ')}`,
            });
        }
        next();
    }
    catch (error) {
        let errorMessage = 'Error en los datos proporcionados';
        if (error instanceof zod_1.z.ZodError) {
            errorMessage = error.errors.map(e => e.message).join(', ');
        }
        return res.status(400).json({
            status: 400,
            message: 'Error de validación',
            errors: errorMessage
        });
    }
};
exports.validateCreate = validateCreate;
