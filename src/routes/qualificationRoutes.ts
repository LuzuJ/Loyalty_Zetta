import { CustomRequest, CustomResponse } from '../interfaces/customReqRes';
import { getQualificationsByID, createQualifications, updateQualifications, deleteQualification, getQualificationsIDs, getAllQualifications } from '../controllers/qualificationController';
import { validateCreate } from '../validators/qualificationValidator';

export const handleQualificationsRoute = (req: CustomRequest, res: CustomResponse) => {
  const { method, url } = req;

  if (method === 'GET' && url === '/api/qualificationsIDs') {
    return getQualificationsIDs(req, res);
  }

  if (method === 'GET' && url?.startsWith('/api/qualifications/')) {
    const id = url.split('/').pop();
    if (id) {
      return getQualificationsByID(req, res);
    }
  }

  if (method === 'GET' && url === '/api/qualificationsAll/') {
    return getAllQualifications(req, res);
  }

  if (method === 'POST' && url === '/api/qualifications') {
    return validateCreate(req, res, () => createQualifications(req, res));
  }

  if (method === 'PUT' && url?.startsWith('/api/qualifications/')) {
    const id = url.split('/').pop();
    if (id) {
      return validateCreate(req, res, () => updateQualifications(req, res));
    }
  }

  if (method === 'DELETE' && url?.startsWith('/api/qualifications/')) {
    const id = url.split('/').pop();
    if (id) {
      return deleteQualification(req, res);
    }
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ status: res.status, message: 'Solicitud Incorrecta' }));
};
