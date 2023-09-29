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
        if (!collaborator){
           throw new UnauthorizedException('Current user not a user or collaborator of the project');
        }
        request['collaborator'] = collaborator;
        /*console.log(`Este es COLLABORADOR QUE INTENTA EJECUTAR LA ACCION`);
        console.log(request['ownerOrCol']);*/
        
        return true;
    }
}