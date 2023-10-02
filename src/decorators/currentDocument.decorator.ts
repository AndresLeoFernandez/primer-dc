import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentDocument = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.currentdocument
  },
);
