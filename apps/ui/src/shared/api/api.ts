import {
  createTokenEndpoint,
  CreateTokenFetcher,
  getAllTokensEndpoint,
  GetAllTokensFetcher,
  getTokenEndpoint,
  GetTokenFetcher,
} from '@cloudretail/api';
import { createFetcher } from './createFetcher';

export const api = {
  getToken: createFetcher<GetTokenFetcher>(getTokenEndpoint),
  createToken: createFetcher<CreateTokenFetcher>(createTokenEndpoint),
  getAllTokens: createFetcher<GetAllTokensFetcher>(getAllTokensEndpoint),
};
