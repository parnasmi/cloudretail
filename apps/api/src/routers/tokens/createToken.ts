import zod from 'zod';
import { pool } from '../../pool.js';
import { userDao } from '../../daos/user/index.js';
import crypto from 'crypto';
import { HttpError } from '../../exceptions/httpErrors.js';
import { tokenDao } from '../../daos/tokens/index.js';
import { createRoute, Fetcher, HttpResponse } from '../../http.js';
import { createTokenEndpoint } from '../../endpoints.js';
import { tryCatch } from '../../tryCatch.js';

export const createToken = createRoute({
  endpoint: createTokenEndpoint,
  auth: true,
  bodySchema: zod.object({
    username: zod.string(),
    password: zod.string(),
  }),
  process: async ({ body, auth }) => {
    const userQuery = await tryCatch(() => {
      return userDao.selectByUsername(pool, {
        username: body.username,
      });
    });

    if (
      !userQuery.ok ||
      userQuery.output.password !==
        crypto.createHash('sha256').update(body.password).digest('hex')
    ) {
      throw new HttpError(401, 'Invalid password or username');
    }

    const token = await tokenDao.createToken(pool, {
      userId: userQuery.output.id,
    });

    return new HttpResponse(201, token);
  },
});

export type CreateTokenFetcher = Fetcher<typeof createToken>;
