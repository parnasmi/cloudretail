import express from 'express';

import zod from 'zod';
import { pool } from '../../pool';
import { userDao } from '../../daos/user';
import crypto from 'crypto';
import { HttpError } from '../../exceptions/httpErrors';
import { tokenDao } from '../../daos/tokens';

const bodySchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const handler: express.RequestHandler = async (request, response) => {
  const body = bodySchema.parse(request.body);

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

  response.status(201).json({ token: token.token });
};

export const createToken = {
  handler,
  method: 'post' as const,
  path: '/tokens',
};
