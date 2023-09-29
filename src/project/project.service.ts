import { BadRequestException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { User } from '../user/entities/user.entity';
import { Document } from '../document/entities/document.entity';
import { Collaborator } from 'src/collaborator/entities/collaborator.entity';
import { RolesCollaborators } from 'src/constants/roles-collaborators';
import { Category } from 'src/category/entities/category.entity';
import { DocumentService } from 'src/document/document.service';
import { CreateDocumentDto } from 'src/document/dto/create-document.dto';
import { UpdateDocumentDto } from 'src/document/dto/update-document.dto';


@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Collaborator) private readonly collaboratorRepository: Repository<Collaborator>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    private readonly documentService: DocumentService,

  ) { }

  async createProject(dto: CreateProjectDto, currentUser: User): Promise<Project> {
   /*Verificamos que no exista ya creado un proyecto por current user con igual titulo*/
    const criteria: FindOneOptions = { relations: ['author', 'category'], where: { title: dto.title.toLowerCase(), author: currentUser.getUserId() } };
    const projectExist = await this.projectRepository.findOne(criteria);
    if (projectExist && projectExist.getAuthor().getUserId() === currentUser.getUserId())
      throw new NotAcceptableException('Project already exist.');
    /*Check si existe la categoria*/
    const criteriaCategory: FindOneOptions = { where: { name: dto.category.toLowerCase() } };
    const currentCategory = await this.categoryRepository.findOne(criteriaCategory);
    if (!currentCategory)
      throw new NotFoundException('Category not exist.');
    const newProject = new Project(dto.title, currentUser, currentCategory);
    let project = await this.projectRepository.save(newProject);
    const newCollaborator = new Collaborator(project, currentUser, RolesCollaborators.OWNER);
    const collaborator = await this.collaboratorRepository.save(newCollaborator);
    return project;
  }


  async addCollaborator( email: string, project: Project): Promise<any> {
    /*verifico que el usuario que se debe asignar como colaborador exista conforme al email*/
    const criteriaUser: FindOneOptions = { where: { email: email } };
    const user = await this.userRepository.findOne(criteriaUser);
    if (!user)
      throw new NotFoundException('The email does not correspond to any user of the system.');
    try {
      const newCollaborator = new Collaborator(project, user, RolesCollaborators.COLLABORATOR);
      const collaborator = await this.collaboratorRepository.save(newCollaborator);
      return { message: `Collaborator ${email} added succesfull in project ${project.getTitle()}.` }
    } catch (error) {
      throw new NotAcceptableException('The collaborator already exists in the project.');
    }
  }
  
  async deleteCollaborator(currentUser:User, email: string ,project: Project): Promise<any> {
    if (currentUser.getEmail()===email)
    throw new NotAcceptableException('You are the owner, not valid operation.');
    const criteriaCollaborator : FindOneOptions = { 
      relations: ['user','project'], 
      where: { 
        user: { email:email,},
        project: { projectId:project.getProjectId(), author: currentUser.getUserId(),}, role:RolesCollaborators.COLLABORATOR },};        
   const resultCollaborator = await this.collaboratorRepository.findOne(criteriaCollaborator);
   if (!resultCollaborator)
   throw new NotFoundException('The email does not exist in the project collaborators.');
   const deletedCollaborator = await this.collaboratorRepository.remove(resultCollaborator);
   return { message: `The ${email} has been deleted for the project ${project.getTitle()}.`}
  }

  async addDocument(project: Project, dto: CreateDocumentDto, userAutor: Collaborator): Promise<any> {
    try {
      const newDocument = await this.documentService.createDocument(dto, project, userAutor);
      return { message: `Document add successfull!!`, newDocument}
    } catch (error) {
      throw new NotAcceptableException('Hubo un error en la creacion del documento.');
    }
  }

  async editDocument(document: Document, dto: UpdateDocumentDto, userAutor: Collaborator): Promise<any> {
    try {
      let newDocument = await this.documentService.updateDocument(document, dto, userAutor);
      return { message: `Document updated successfull!!`, newDocument};
    } catch (error) {
      throw new NotAcceptableException('Hubo un error en la actualizacion del documento.');
    }
  }
/* Devuelve los proyectos donde el usuario es Collaborator*/
  async getProjectsOwner(currentUser:User):Promise<any> {
    const criteriaOwner : FindManyOptions = {/*relations:['author'],*/ where:{author:{userId:currentUser.getUserId(),}}};
    const allProyects = await this.projectRepository.find(criteriaOwner);
    return allProyects;
  }
  /* Devuelve los proyectos donde el usuario es Collaborator*/
  async getProjectsCollaborator(currentUser:User):Promise<any>{
    const criteriaCollaborator : FindManyOptions = { 
     select: { 
      project: {
        projectId:true,
        title:true,
      },
    },
    relations: ['user','project'],
    where: { 
      user: {
        userId:currentUser.getUserId(),
      },
      role:RolesCollaborators.COLLABORATOR 
    },
  };        
  const projectCollaborator = await this.collaboratorRepository.find(criteriaCollaborator);
  
  if (projectCollaborator.length===0){
    return { message:'Does not have projects as a collaborator.'}
  }else {
    console.log(projectCollaborator);
    const result : Project[] = [];
    for (const pro of projectCollaborator ) {
      const criteriaCol: FindOneOptions = { where: { projectId: pro.project.getProjectId()}};
      const current = await this.projectRepository.findOne(criteriaCol);
      result.push(current);
    };
    console.log(result);
    return result;
  }
}

  async getProjects(): Promise<Project[] | null> {
    return await this.projectRepository.find()
  }

  async getOne(id: number, userEntity?: User): Promise<Project | null> {
    const criteria: FindOneOptions = { where: { projectId: id } }
    let proyect = await this.projectRepository.findOne(criteria);
    if (!proyect)
      throw new NotFoundException('Proyect does not exist.');
    return proyect;
  }

  async remove(project: Project): Promise<Project | null> {
    return await this.projectRepository.remove(project);
  }
}
