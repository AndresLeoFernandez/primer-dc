import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { Request } from "express";
import { ProjectService } from "src/project/project.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "src/project/entities/project.entity";
import { FindOneOptions, Repository } from "typeorm";

@Injectable()
export class ProjectOwnerGuard implements CanActivate {
    
    constructor( 
        @InjectRepository(Project) private readonly projectRepository: Repository<Project>,)
    {}
    
    
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();        
        const currentUser= request.user;
        const projectId = request.params.id;
        const criteriaProject : FindOneOptions = { relations:['author',],where:{ projectId: projectId}};
        const project = await this.projectRepository.findOne(criteriaProject);
        request['project'] = project;
        if (!(currentUser.userId === project.getAuthor().getUserId())){
           throw new UnauthorizedException('Current user not owner');
        }
        return true;
    }
}