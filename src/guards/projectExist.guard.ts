import { CanActivate, ExecutionContext, Injectable, NotFoundException, } from "@nestjs/common";

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
export class ProjectExistGuard implements CanActivate {
    
    constructor( 
        @InjectRepository(Project) private readonly projectRepository: Repository<Project>,)
    {}    
    /**
    *  Autoriza acceso a procesar el endpoint 
    *  Si el param id se corresponde con un 
    *  project valido en la tabla de proyectos.
    * @param {ExecutionContext} context
    * @returns {Promise<boolean>}
    * True si se verifica que existe
    * Exception caso contrario
    * Obs: 
    *   1 - Genera key currentproject en la request 
    */
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();        
        const currentUser= request.user;
        const projectId = request.params.id;
        const criteriaProject : FindOneOptions = { relations:['author',],where:{ projectId: projectId}};
        const project = await this.projectRepository.findOne(criteriaProject);
        if (!project)
        throw new NotFoundException('Proyect does not exist.');
        request['currentproject'] = project;
        return true;
    }
}