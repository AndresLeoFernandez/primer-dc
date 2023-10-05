import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { Collaborator } from "src/collaborator/entities/collaborator.entity";


/*
Este guard verifica que:
dado el proyecto el usuario actual sea dueño o colaborador
crea en request ownerOrCol que es el colaborador actual ejecutando la accion.
*/


@Injectable()
export class ProjectCollaboratorGuard implements CanActivate {
    
    constructor( 
        @InjectRepository(Collaborator) private readonly collaboratorRepository:Repository<Collaborator>,
        )
    {}       
    /**
    *  Autoriza acceso a procesar el endpoint 
    *  Si el param id se corresponde con un projectId valido y  
    *  user.userid es colaborador del proyecto verificando 
    *  en la tabla de colaboradores.
    * @param {ExecutionContext} context
    * @returns {Promise<boolean>}
    * True si se verifica que existe
    * Exception caso contrario
    * Obs: 
    *   1 - Genera key collaborator en la request 
    */
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();        
        const currentUser= request.user;
        const numberProjectId = request.params.id;
        const criteriaCollaborator : FindOneOptions = { 
            relations:['project','user'],
            where:{
                project: {
                    projectId:numberProjectId,
                },
                user:{
                    userId:currentUser.userId,
                }    
            }
        };
        const collaborator = await this.collaboratorRepository.findOne(criteriaCollaborator);
        if (!collaborator)
        throw new UnauthorizedException('Current user not a user or collaborator of the project');
        request['collaborator'] = collaborator;
        return true;
    }
}