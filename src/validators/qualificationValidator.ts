import { z } from 'zod';
import { CustomRequest, CustomResponse } from '../interfaces/customReqRes';

const qualificationSchema = z.object({
  donationId: z.string(),
  donatorId: z.string(),
  organizationId: z.string(),
  generalScore: z.number().int().min(1).max(10),
  notes: z.string().optional(),
  qualityCalification: z.object({
    score: z.number().int().min(1).max(5),
    comments: z.string().optional(),
  }).optional(),
  timeCalification: z.object({
    score: z.number().int().min(1).max(5),
    comments: z.string().optional(),
  }).optional(),
  packagingCalification: z.object({
    score: z.number().int().min(1).max(5),
    comments: z.string().optional(),
  }).optional(),
  communicationCalification: z.object({
    score: z.number().int().min(1).max(5),
    comments: z.string().optional(),
  }).optional(),
});

// Middleware para validar el cuerpo de la solicitud
export const validateCreate = (req: CustomRequest, res: CustomResponse, next: Function): Response | void => {
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
  } catch (error) {
    let errorMessage = 'Error en los datos proporcionados';

    if (error instanceof z.ZodError) {
      errorMessage = error.errors.map(e => e.message).join(', ');
    }

    return res.status(400).json({
      status: 400,
      message: 'Error de validación',
      errors: errorMessage
    });
  }
};
