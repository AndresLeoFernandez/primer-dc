import { createParamDecorator, ExecutionContext } from '@nestjs/common';
/*
*  Genera un decorador @CurrentCollaborator que obtiene el collaborator 
*  actual como tipo Collaborator de la request.
*/
export const CurrentCollaborator = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.collaborator;
  },
);
