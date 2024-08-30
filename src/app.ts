import { IncomingMessage, ServerResponse } from 'http';
import  handleQualificationsRoute  from './routes/qualificationRoutes';
import { handleError } from './middlewares/errorHandler';
import { NextFunction } from 'express';

const app = (req: IncomingMessage, res: ServerResponse, next: NextFunction) => {
  try {
    if (req.url?.startsWith('/api')) {
      handleQualificationsRoute(req as any, res as any, next as any);
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Not Found' }));
    }
  } catch (err) {
    handleError(res, 500, 'Something went wrong');
  }
};

export default app;
