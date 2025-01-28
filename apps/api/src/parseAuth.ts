import { tokenDao } from './daos/tokens';
import { userDao } from './daos/user';
import { HttpError } from './exceptions';
import { pool } from './pool';

export const parseAuth = async (authorizationHeader?: string) => {
  if (!authorizationHeader) {
    return new HttpError(401, 'Missing authorization header');
  }

  const parsed = /^Bearer (.*)$/.exec(authorizationHeader);

  if (parsed === null) {
    return new HttpError(401, 'Invalid authorization header');
  }

  const tokenId = parsed[1];

  if (!tokenId) {
    return new HttpError(401, 'Invalid beared token');
  }

  const token = await tokenDao.selectById(pool, { id: tokenId });
  const user = await userDao.selectById(pool, { id: token.user_id });

  return {
    user,
    token,
  };
};
