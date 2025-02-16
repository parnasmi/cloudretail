import express from 'express';
import { HttpError } from './exceptions/index.js';
import { ZodError } from 'zod';
import { createToken } from './routers/tokens/createToken.js';
import { registerRoute } from './http.js';
import { getToken } from './routers/tokens/getToken.js';
import { getAllTokens } from './routers/tokens/getAllTokens.js';

export const app = express();

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get('/', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

registerRoute(app, createToken);
registerRoute(app, getToken);
registerRoute(app, getAllTokens);

app.use(
  (
    error: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    if (error instanceof HttpError) {
      res.status(error.status).json({ error: error.message });
    }

    if (error instanceof ZodError) {
      res.status(422).json({ error: error.errors });
    }

    res.status(500).json({ error: 'Internal Server Error' });
  },
);
