import zod from 'zod';
import { pool } from '../../pool';
import { userDao } from '../../daos/user';
import crypto from 'crypto';
import { HttpError } from '../../exceptions/httpErrors';
import { tokenDao } from '../../daos/tokens';
import { createHandler, HttpResponse } from '../../http';

export const createToken = {
  handler: createHandler({
    bodySchema: zod.object({
      username: zod.string(),
      password: zod.string(),
    }),
    process: async ({ body }) => {
      const user = await userDao.selectByUsername(pool, {
        username: body.username,
      });

      if (
        user.password !==
        crypto.createHash('sha256').update(body.password).digest('hex')
      ) {
        throw new HttpError(401, 'Invalid password or username');
      }

      const token = await tokenDao.createToken(pool, { userId: user.id });

      return new HttpResponse(201, token);
    },
  }),
  method: 'post' as const,
  path: '/tokens',
};
