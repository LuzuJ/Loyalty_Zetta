import { IncomingMessage, ServerResponse } from 'http';
import { z } from 'zod';
import {
  getAllQualifications as fetchAllQualifications,
  createQualifications as addNewQualifications,
  updateQualifications as modifyQualifications,
  deleteQualification as removeQualification,
  getQualificationsIDs as fetchAllQualificationsIDs,
  getQualificationsByID as fetchAllQualificationsByID,
} from '../services/qualificationService';

// Esquemas para validar el ID, lo transforma de string a número
const idSchema = z.string().transform((val) => parseInt(val, 10)).refine((val) => !isNaN(val), {
  message: 'El ID proporcionado no es válido',
});

// Define el qualificationSchema
const qualificationSchema = z.object({
  donationId: z.string(),
  donatorId: z.string(),
  organizationId: z.string(),
  generalScore: z.number().min(0).max(5),
  notes: z.string(),
  qualityCalification: z.object({
    score: z.number().min(0).max(5),
    comments: z.string(),
  }),
  timeCalification: z.object({
    score: z.number().min(0).max(5),
    comments: z.string(),
  }),
  packagingCalification: z.object({
    score: z.number().min(0).max(5),
    comments: z.string(),
  }),
  communicationCalification: z.object({
    score: z.number().min(0).max(5),
    comments: z.string(),
  }),
});

export const getQualificationsIDs = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const qualificationsIDs = await fetchAllQualificationsIDs();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      status: 200,
      message: 'IDs obtenidos correctamente',
      response: qualificationsIDs,
    }));
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify({
      status: 500,
      message: 'Error al obtener las IDs',
    }));
  }
};


export const getQualificationsByID = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const id = url.pathname.split('/').pop() || '';
    const parsedId = idSchema.parse(id);

    const qualifications = await fetchAllQualificationsByID(parsedId);
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
  } catch (error: any) {
    res.statusCode = 500;
    res.end(JSON.stringify({
      status: 500,
      message: 'Error al obtener la calificación',
      errors: error.message || 'Error interno del servidor',
    }));
  }
};

export const getAllQualifications = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const qualifications = await fetchAllQualifications();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      status: 200,
      message: 'Todas las calificaciones obtenidas correctamente',
      response: qualifications,
    }));
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify({
      status: 500,
      message: 'Error al obtener las calificaciones',
    }));
  }
};

export const createQualifications = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const data = await parseRequestBody(req);
    const parsedData = qualificationSchema.parse(data);
    const newQualifications = await addNewQualifications(parsedData);
    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      status: 201,
      message: 'Calificación creada correctamente',
      response: newQualifications,
    }));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
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
    } else {
      res.statusCode = 500;
      res.end(JSON.stringify({
        status: 500,
        message: 'Error interno del servidor',
      }));
    }
  }
};

export const updateQualifications = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const id = url.pathname.split('/').pop() || '';
    const parsedId = idSchema.parse(id);
    const data = await parseRequestBody(req);
    const parsedData = qualificationSchema.partial().parse(data);

    const updatedQualification = await modifyQualifications(parsedId, parsedData);
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
  } catch (error: any) {
    res.statusCode = 500;
    res.end(JSON.stringify({
      status: 500,
      message: 'Error al actualizar la calificación',
      errors: error.message || 'Error interno del servidor',
    }));
  }
};

export const deleteQualification = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const id = url.pathname.split('/').pop() || '';
    const parsedId = idSchema.parse(id);

    const deletedQualification = await removeQualification(parsedId);
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
  } catch (error: any) {
    res.statusCode = 500;
    res.end(JSON.stringify({
      status: 500,
      message: 'Error al eliminar la calificación',
      errors: error.message || 'Error interno del servidor',
    }));
  }
};

const parseRequestBody = (req: IncomingMessage): Promise<any> => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
  });
};
