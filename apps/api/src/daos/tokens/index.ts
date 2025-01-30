import { createToken } from './createToken.js';
import { selectAllByUserId } from './selectAllByUserId.js';
import { selectById } from './selectById.js';

export const tokenDao = {
  createToken,
  selectById,
  selectAllByUserId,
};
