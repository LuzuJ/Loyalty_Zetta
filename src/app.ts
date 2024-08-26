import { IncomingMessage, ServerResponse } from 'http';
import { handleQualificationsRoute } from './routes/qualificationRoutes';
import { handleError } from './middlewares/errorHandler';

const app = (req: IncomingMessage, res: ServerResponse) => {
  try {
    if (req.url?.startsWith('/api')) {
      handleQualificationsRoute(req as any, res as any);
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
