import { selectByUsername } from './selectByUsername';
import { createUser } from './createUser';
import { selectById } from './selectById';

export const userDao = {
  selectByUsername,
  createUser,
  selectById,
};
