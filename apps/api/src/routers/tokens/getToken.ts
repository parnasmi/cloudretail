import { tokenDao } from '../../daos/tokens/index.js';
import { getTokenEndpoint } from '../../endpoints.js';
import {
  createHandler,
  createRoute,
  Fetcher,
  HttpResponse,
} from '../../http.js';
import { pool } from '../../pool.js';

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
