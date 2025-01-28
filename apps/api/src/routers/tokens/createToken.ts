import zod from 'zod';
import { pool } from '../../pool';
import { userDao } from '../../daos/user';
import crypto from 'crypto';
import { HttpError } from '../../exceptions/httpErrors';
import { tokenDao } from '../../daos/tokens';
import { createHandler, createRoute, Fetcher, HttpResponse } from '../../http';
import { createTokenEndpoint } from '../../endpoints';
import { tryCatch } from '../../tryCatch';

export const createToken = createRoute({
  handler: createHandler({
    bodySchema: zod.object({
      username: zod.string(),
      password: zod.string(),
    }),
    process: async ({ body }) => {
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
  }),
  endpoint: createTokenEndpoint,
});

export type CreateTokenFetcher = Fetcher<typeof createToken.handler>;
