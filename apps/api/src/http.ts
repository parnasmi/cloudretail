import zod from 'zod';
import express from 'express';

export class HttpResponse<Body> {
  constructor(
    public readonly status: number,
    public readonly body: Body,
  ) {}
}

export type CreateHandlerOptions<RequestBody, ResponseBody> = {
  bodySchema: zod.ZodSchema<RequestBody>;
  process: (params: {
    body: RequestBody;
  }) => Promise<HttpResponse<ResponseBody>>;
};

export const createHandler = <RequestParams, RequestBody, ResponseBody>({
  bodySchema,
  process,
}: CreateHandlerOptions<RequestBody, ResponseBody>): express.RequestHandler<
  RequestParams,
  ResponseBody,
  RequestBody
> => {
  return async (request, response) => {
    const { status, body } = await process({
      body: bodySchema.parse(request.body),
    });
    response.status(status).json(body);
  };
};

export const createRoute = <RequestParams, RequestBody, ResponseBody>(
  route: Route<RequestParams, ResponseBody, RequestBody>,
) => route;

export type Route<RequestParams, RequestBody, ResponseBody> = {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete';
  handler: express.RequestHandler<RequestParams, ResponseBody, RequestBody>;
};

export const registerRoute = <RequestParams, RequestBody, ResponseBody>(
  router: express.Router,
  route: Route<RequestParams, RequestBody, ResponseBody>,
) => {
  router[route.method](route.path, route.handler);
};

export type Fetcher<Handler> =
  Handler extends express.RequestHandler<
    infer RequestParams,
    infer ResponseBody,
    infer RequestBody
  >
    ? (options: {
        params: RequestParams;
        body: RequestBody;
      }) => Promise<ResponseBody>
    : never;
