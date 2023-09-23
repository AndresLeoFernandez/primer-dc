import { BadRequestException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { User } from '../user/entities/user.entity';
import { Document } from '../document/entities/document.entity';
import { Collaborator } from 'src/collaborator/entities/collaborator.entity';
import { RolesCollaborators } from 'src/constants/roles-collaborators';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';


@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Collaborator) private readonly collaboratorRepository: Repository<Collaborator>,
    @InjectRepository(Document) private readonly documentRepository: Repository<Document>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    
  ) {}
  
  async createProject(dto: CreateProjectDto, authorid:number):Promise<Project> {
    /* Recupero current User*/
    const criteriaUser : FindOneOptions = { where:{ userId: authorid}};
    const currentUser = await this.userRepository.findOne(criteriaUser);
    /*Verificamos que no exista ya creado un proyecto por current user con igual titulo*/
    const criteria : FindOneOptions = { relations:['author','category'],where:{ title: dto.title.toLowerCase(), author: currentUser.getUserId()}};
    const projectExist = await this.projectRepository.findOne(criteria);
    if (projectExist && projectExist.getAuthor().getUserId() === currentUser.getUserId())
      throw new NotAcceptableException('Project already exist.');
    /*Check si existe la categoria*/
    const criteriaCategory : FindOneOptions = { where:{ name: dto.category.toLowerCase()}};
    console.log(dto);
    console.log(dto.category);
    const currentCategory = await this.categoryRepository.findOne(criteriaCategory);
    console.log(currentCategory);
    if (!currentCategory)
      throw new NotFoundException('Category not exist.');
    const newProject = new Project(dto.title,currentUser,currentCategory);
    const project = await this.projectRepository.save(newProject);
    const newCollaborator = new Collaborator(project,currentUser,RolesCollaborators.OWNER);
    const collaborator = await this.collaboratorRepository.save(newCollaborator); 
    return project;
  }
  

  async addCollaborator(projectId: number, rol:RolesCollaborators, email:string, currentEmail:string):Promise<any>{
    /*verifico que exista el pojecto respecto del project id ingresado*/
    const criteriaProject : FindOneOptions = { relations:['author'],where: { projectId } }
    let project = await this.projectRepository.findOne(criteriaProject);
    if (!project)
      throw new NotFoundException('Proyect does not exist.');
    /*verifico que el usuario que se debe asignar como colaborador exista conforme al email*/
    const criteriaCollaborator : FindOneOptions = { where:{ email:email}};
    const userCollaborator = await this.userRepository.findOne(criteriaCollaborator);
    if (!userCollaborator)
    throw new NotFoundException('User colaborator does not exist.');
    /*verifico que el usuario logueado exista (se podria evitar) */
    const criteriaCurrentUser : FindOneOptions = { where:{ email:currentEmail}};
    const userOwner = await this.userRepository.findOne(criteriaCurrentUser);
    if (!userOwner)
    throw new NotFoundException('User Owner does not exists.');
    /*verifico que usuario logueado sea el dueño del proyecto*/
    const criteriaOwnerCollaborator : FindOneOptions = { relations:['user'], where:{ role: RolesCollaborators.OWNER, user:userOwner.getUserId()}};
    const ownerCollaborator = await this.collaboratorRepository.findOne(criteriaOwnerCollaborator);
    if (!ownerCollaborator)
      throw new NotFoundException(`Current User with email: ${currentEmail} not is the Owner. Don not have permissions to do this operation.`);
    const newCollaborator = new Collaborator(project,userCollaborator,rol);
    try {
    const collaborator = await this.collaboratorRepository.save(newCollaborator);
    return {message: `Collaborator ${email} added succesfull in project ${project.getTitle()}.` }
    } catch (error){
      throw new NotAcceptableException('The collaborator already exists in the project.');    }
  }
  
  async getProjects():Promise<Project[] | null> {    
    return await this.projectRepository.find()   
  }  

  async getOne(id: number, userEntity?: User): Promise<Project | null> {
    const criteria : FindOneOptions = { where: { projectId: id } }
    let proyect = await this.projectRepository.findOne(criteria);
    if (!proyect)
      throw new NotFoundException('Proyect does not exist.');
    return proyect;
  }  

  async remove(id: number,currentEmail: string):Promise<Project | null> {
    const criteria : FindOneOptions = { where: { projectId: id } }
    let project = await this.projectRepository.findOne(criteria);
    if (!project)
    throw new NotFoundException('Project does not exist.');
    const criteriaCurrentUser : FindOneOptions = { where:{ email:currentEmail}};
    const currentUser = await this.userRepository.findOne(criteriaCurrentUser);    
    return await this.projectRepository.remove(project);   
      
    /*Elimino todos los colaboradores del projecto*/
    /*Elimino todos los documentos del projecto*/
    
  }  
}
