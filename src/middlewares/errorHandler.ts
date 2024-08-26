import { ServerResponse } from 'http';

// Para manejar errores, funciona como un middleware de 'Express'
export const handleError = (res: ServerResponse, statusCode: number, message: string) => {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ status: statusCode, message }));
};
