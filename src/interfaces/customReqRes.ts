import { IncomingMessage, ServerResponse } from 'http';

// Expansión de interfaz personalizada para request y response
export interface CustomRequest extends IncomingMessage {
  body?: any;
  params?: Record<string, string>;
}

export interface CustomResponse extends ServerResponse {
  status(code: number): this;
  json(data: any): void;
}
