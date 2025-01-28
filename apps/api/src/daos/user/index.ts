import { selectByUsername } from './selectByUsername.js';
import { createUser } from './createUser.js';
import { selectById } from './selectById.js';

export const userDao = {
  selectByUsername,
  createUser,
  selectById,
};
