import { tokenDao } from '../../daos/tokens/index.js';
import { getAllTokensEndpoint } from '../../endpoints.js';
import { createRoute, type Fetcher, HttpResponse } from '../../http.js';
import { pool } from '../../pool.js';

export const getAllTokens = createRoute({
  endpoint: getAllTokensEndpoint,
  auth: true,
  process: async ({ auth }) => {
    const tokens = await tokenDao.selectAllByUserId(pool, {
      user_id: auth.user.id,
    });
    return new HttpResponse(200, tokens);
  },
});

export type GetAllTokensFetcher = Fetcher<typeof getAllTokens>;
