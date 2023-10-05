import { createParamDecorator, ExecutionContext } from '@nestjs/common';
/*
* Genera un decorador @CurrentProject que obtiene el proyecto actual
* como tipo Project de la request.
*/
export const CurrentProject = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.currentproject
  },
);
