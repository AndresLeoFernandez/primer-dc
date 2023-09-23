import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOneOptions, Repository, createQueryBuilder } from "typeorm";
import { Collaborator } from "src/collaborator/entities/collaborator.entity";
import { Project } from "src/project/entities/project.entity";

@Injectable()
export class ProjectCollaboratorGuard implements CanActivate {
    
    constructor( 
        @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
        @InjectRepository(Collaborator) private readonly collaboratorRepository:Repository<Collaborator>,
        )
    {}       
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();        
        const currentUser= request.user;
        const numberProjectId = request.params.id;
        const criteriaCollaborator : FindManyOptions = { 
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
        const colaboradores = await this.collaboratorRepository.find(criteriaCollaborator);
        if (!colaboradores){
           throw new UnauthorizedException('Current user not a user or collaborator of the project');
        }
        return true;
    }
}