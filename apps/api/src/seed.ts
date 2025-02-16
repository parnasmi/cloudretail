import crypto from 'crypto';
import { DbClient } from './pool.js';
import { userDao } from './daos/user/index.js';
import { ADMIN_PASSWORD, ADMIN_USERNAME } from './constants.js';
import { NoRecordsFound } from './exceptions/index.js';

export const seed = async (dbClient: DbClient) => {
  try {
    await userDao.selectByUsername(dbClient, { username: ADMIN_USERNAME });
  } catch (error) {
    if (error instanceof NoRecordsFound) {
      await userDao.createUser(dbClient, {
        username: ADMIN_USERNAME,
        password: crypto
          .createHash('sha256')
          .update(ADMIN_PASSWORD)
          .digest('hex'),
      });
      console.info('Admin user created');
    }
  }
  console.info('Database seeded');
};
