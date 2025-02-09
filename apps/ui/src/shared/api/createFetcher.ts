import { compile } from 'path-to-regexp';

import { Endpoint, Method } from '@cloudretail/api';

interface FetchJSONArgs<RequestBody> {
  url: string;
  method: Method;
  body?: RequestBody;
}

const fetchJSON = async <RequestBody, ResponseBody>({
  url,
  method,
  body,
}: FetchJSONArgs<RequestBody>) => {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: method !== 'get' && body ? JSON.stringify(body) : undefined,
  });

  return response.json() as Promise<ResponseBody>;
};

export const createFetcher = <Fetcher>({ path, method }: Endpoint<unknown>) => {
  const getUrl = compile(path);

  const fetcher = ({
    params,
    body,
  }: {
    params: Record<string, string>;
    body: Record<string, unknown>;
  }) => {
    const url = getUrl(params);

    return fetchJSON({ url: url, method, body });
  };

  return fetcher as Fetcher;
};
