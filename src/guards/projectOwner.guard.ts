import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
/*import { JwtService } from "@nestjs/jwt";*/
/*import { jwtConstants } from "./constants";*/
/*import { Request } from "express";*/
/*import { ProjectService } from "src/project/project.service";*/
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "src/project/entities/project.entity";
import { FindOneOptions, Repository } from "typeorm";

/*
Este guard verifica que:
exista el projecto conforme al id
 y que el autor del proyecto sea el usuario actual
crea en request currentProject
*/

@Injectable()
export class ProjectOwnerGuard implements CanActivate {
    
    constructor( 
        @InjectRepository(Project) private readonly projectRepository: Repository<Project>,)
    {}    
    /**
    *  Autoriza acceso a procesar el endpoint 
    *  Si el param id se corresponde con un project valido en la tabla de proyectos
    * y el currentuser userId es el author del proyecto.
    * @param {ExecutionContext} context
    * @returns {Promise<boolean>}
    * True si se verifica que existe
    * Exception caso contrario
    * Obs: 
    *   1 - Genera key owner en la request 
    */
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();        
        const currentUser= request.user;
        const projectId = request.params.id;
        const criteriaProject : FindOneOptions = { relations:['author',],where:{ projectId: projectId}};
        const project = await this.projectRepository.findOne(criteriaProject);
        if (!project)
            throw new NotFoundException('Proyect does not exist.');
        if (!(currentUser.userId === project.getAuthor().getUserId())){
           throw new UnauthorizedException('Current user not owner.');
        }
        request['owner'] = project.getAuthor();
        return true;
    }
}