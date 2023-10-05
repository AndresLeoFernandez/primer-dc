import { createParamDecorator, ExecutionContext } from '@nestjs/common';
/*
* Genera un decorador @CurrentDocument que obtiene el document actual
* como tipo Document de la request.
*/
export const CurrentDocument = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.currentdocument
  },
);
