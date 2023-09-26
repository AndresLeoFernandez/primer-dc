import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentCollaborator = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.collaborator;
  },
);
