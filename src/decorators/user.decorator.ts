import { createParamDecorator, ExecutionContext } from '@nestjs/common';
/*
* Genera un decorador @User que obtiene el usuario logueado como un objeto
*  { user.userId, user.email } de la request.
*/
export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user && user[data] : user;
  },
);
