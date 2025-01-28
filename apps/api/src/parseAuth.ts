import { tokenDao } from './daos/tokens/index.js';
import { userDao } from './daos/user/index.js';
import { HttpError } from './exceptions/index.js';
import { pool } from './pool.js';

export const parseAuth = async (authorizationHeader?: string) => {
  if (!authorizationHeader) {
    return new HttpError(401, 'Missing authorization header');
  }

  const parsed = /^Bearer (.*)$/.exec(authorizationHeader);

  // Check whether token is in valid format
  if (parsed === null) {
    return new HttpError(401, 'Invalid authorization header');
  }

  const tokenId = parsed[1];

  //Check tokenId is not empty
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
