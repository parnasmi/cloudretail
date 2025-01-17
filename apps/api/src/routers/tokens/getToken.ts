import { tokenDao } from '../../daos/tokens';
import {
  createHandler,
  createRoute,
  Endpoint,
  Fetcher,
  HttpResponse,
} from '../../http';
import { pool } from '../../pool';

export const getTokenEndpoint = new Endpoint<{ id: number }>(
  'get',
  '/tokens/:id',
);

export const getToken = createRoute({
  endpoint: getTokenEndpoint,
  handler: createHandler({
    process: async ({ params }) => {
      const token = await tokenDao.selectById(pool, { id: params.id });

      return new HttpResponse(200, token);
    },
  }),
});

export type GetTokenFetcher = Fetcher<typeof getToken.handler>;
