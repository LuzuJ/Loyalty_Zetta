import { createServer, IncomingMessage, ServerResponse } from 'http';
import { handleRequest } from './controllers/controllers';

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  handleRequest(req, res);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
