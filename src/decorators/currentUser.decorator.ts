import { createParamDecorator, ExecutionContext } from '@nestjs/common';
/*
* Genera un decorador @CurrentUser que obtiene el usuario 
* logueado como un User de la request.
*/
export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.currentuser;
  },
);
