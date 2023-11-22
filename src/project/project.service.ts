import { BadRequestException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, In, Like, Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { User } from '../user/entities/user.entity';
import { Document } from '../document/entities/document.entity';
import { Collaborator } from 'src/collaborator/entities/collaborator.entity';
import { RolesCollaborators } from 'src/constants/roles-collaborators';
import { Category } from 'src/category/entities/category.entity';
import { DocumentService } from 'src/document/document.service';
import { CreateDocumentDto } from 'src/document/dto/create-document.dto';
import { UpdateDocumentDto } from 'src/document/dto/update-document.dto';
import { UpdateProjectDto } from './dto/update-project.dto';


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
    const newProject = new Project(dto.title, dto.description, currentUser, currentCategory);
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


  /* Dado el proyecto devuelve los colaboradores */
  async getCollaboratorsByProjectId(project:Project){
    const criteriaCollaborator : FindManyOptions = { 
      relations: ['user','project'], 
      select:{
        project:{
          projectId:true,
      }}, 
      where: { 
      project: { projectId:project.getProjectId(),}, role:RolesCollaborators.COLLABORATOR },};        
    return  this.collaboratorRepository.find(criteriaCollaborator);
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

  async editProject(project:Project,projectDto:UpdateProjectDto,currentUser:User):Promise<any>{
    if (project.getAuthor().getUserId() === currentUser.getUserId()){
      if ("title" in projectDto && project.getTitle()!== projectDto.title){  
        const criteria: FindOneOptions = { relations: ['author', 'category'], where: { title: projectDto.title.toLowerCase(), author: currentUser.getUserId() } };
        const projectExist = await this.projectRepository.findOne(criteria);
        if (projectExist && projectExist.getAuthor().getUserId() === currentUser.getUserId())
        throw new NotAcceptableException('Project already exist.');
        project.setTitle(projectDto.title);
      }
      if ("description" in projectDto && project.getDescription()!==projectDto.description){
        project.setDescription(projectDto.description)
      }
      if ("category" in projectDto && project.getCategory().getName()!== projectDto.category.toLowerCase()){ 
        /*Check si existe la categoria*/
        const criteriaCategory: FindOneOptions = { where: { name: projectDto.category.toLowerCase() } };
        const currentCategory = await this.categoryRepository.findOne(criteriaCategory);
        if (!currentCategory)
        throw new NotFoundException('Category not exist.');
        project.setCategory(currentCategory)
      }
      let projectChanged = await this.projectRepository.save(project);      
      return { message: `Project updated successfull!!`,projectChanged};
    }
    return { message: `Project not updated - Error`};
  }


/* Devuelve los proyectos donde el id de usuario es Owner*/
async getProjectsOwnerId(userId:number):Promise<any> {
  const criteriaUser: FindOneOptions = { where:{ userId:userId}};
  const user = await this.userRepository.findOneOrFail(criteriaUser);
  return this.getProjectsOwner(user);
}
  

/* Devuelve los proyectos donde el usuario es Dueño*/
async getProjectsOwner(currentUser:User):Promise<any> {
  const criteriaOwner : FindManyOptions = {relations:['category'],where:{author:{userId:currentUser.getUserId(),}},order:{creationDate: 'DESC',}};
  const allProjects = await this.projectRepository.find(criteriaOwner);
  if (!allProjects)
  return { message:'Does not have projects as Owner.',status:'Ok',data:allProjects};
  return { message:'Does have projects as Owner.',status:'Ok',data:allProjects};
}

/* Devuelve los proyectos donde el id de usuario es Collaborator*/
async getProjectsCollaboratorsId(userId:number):Promise<any>{
  const criteriaUser: FindOneOptions = { where:{ userId:userId}};
  const user = await this.userRepository.findOneOrFail(criteriaUser);
  return this.getProjectsCollaborator(user);
  
}
  /* Devuelve los proyectos donde el usuario es Collaborator*/
  async getProjectsCollaborator(currentUser:User):Promise<any>{
    const criteriaCollaborator : FindManyOptions = { 
    select: { project: { projectId:true, title:true, },}, relations: ['user','project'],
    where: { user: { userId:currentUser.getUserId(),}, role:RolesCollaborators.COLLABORATOR },};        
  const projectCollaborator = await this.collaboratorRepository.find(criteriaCollaborator);
  if (projectCollaborator.length===0){
    return { message:'Does not have projects as a collaborator.',status:'Ok',data:[]}
  }else {
    const result : Project[] = [];
    for (const pro of projectCollaborator ) {
      const criteriaCol: FindOneOptions = { relations:['category'],where: { projectId: pro.project.getProjectId()}};
      const current = await this.projectRepository.findOne(criteriaCol);
      result.push(current);
    };
    return { message:'Have projects as a collaborator.',status:'Ok',data:result};
  }
}

  async getProjects(): Promise<Project[] | null> {
    /*agrego entidades para que sea mas completo lo que devuelve */
    const criteriaProjects : FindManyOptions = {relations: ['author','category'],order:{creationDate: 'DESC'}};   
   return await this.projectRepository.find(criteriaProjects);
    /*return await this.projectRepository.find()*/
  }

  async getOne(id: number, userEntity?: User): Promise<Project | null> {
    const criteria: FindOneOptions = {relations: ['author','category'], where: { projectId: id } }
    let project = await this.projectRepository.findOne(criteria);
    if (!project)
      throw new NotFoundException('Proyect does not exist.');
    return project;
  }
  async getOneComplete(id: number,): Promise<any | null> {
    const criteria: FindOneOptions = {select:{author:{email:true,username:true,userId:true},category:{name:true,categoryId:true}}, relations:['author','category',], where: { projectId: id } }
    let project = await this.projectRepository.findOne(criteria);
    if (!project)
      throw new NotFoundException('Project does not exist.');
    
    const collaborators = await this.getCollaboratorsByProjectId(project);
    const documents = await this.documentService.getListDocumentsByProjectId(id);
    const completo = {project, collaborators,documents  }

    return completo;
  }


  async getProjectsByCategoryName(name:string):Promise<Project[]> {
    const criteria : FindManyOptions = {relations:['category'], where: { category:{ name: name,},},};
    const projects = await this.projectRepository.find(criteria);
    return projects;
  }
  
  /* El remove solo autorizado para el dueño del proyecto.  
  * Elimina projecto y sus colaboradores siempre que no posea documentos vigentes*/
  async deleteProject(project: Project, currentUser:User): Promise<Project | null> {
    if (await this.hasDocument(project))
    throw new NotAcceptableException('First You must delete existing documents in the project.'); 
    const collaborators = await this.getCollaboratorsByProjectId(project);
    this.collaboratorRepository.remove(collaborators);
    console.log('The collaborators are deleted.');
    return await this.projectRepository.remove(project);
  }
  
  async hasDocument(project:Project):Promise<Boolean>{
    const existe = await this.documentService.projectHasDocument(project.getProjectId());
    return existe? existe: false;
    
  }
  async removeDocument(currentDocument:Document):Promise<void>{
    void await this.documentService.deleteDocument(currentDocument);
  }

  async removeDocuments(currentProject:Project){
    const documents = await this.documentService.getDocumentsByProjectId(currentProject.getProjectId());
    for (const doc of documents) {
      console.log(`Start delete ${doc.getDocumentId()}`);
      const current = await this.documentService.deleteDocument(doc);
      console.log(`Operation finished. Document ${doc.getDocumentId()} is deleted Ok.`);
    } 
  }

  async searchProjects(query: { title: string,/* author: number, *//*categoryIds: string[], */sortBy: "ASC" | "DESC", skip?: number,}){
    /*console.log('qqqqqqq5qqqqqqqqqqqqq');
    console.log(typeof query.categoryIds);
    console.log('qqqqqqqqqqqqqqqqqqqq');*/
    const criteria : FindManyOptions = {
      relations:['author','category'],
      where: {
          ...query.title && {
            title: Like(`%${query.title}%`),
          },
          /*...query.author && {
              author: {
                userId: query.author
              },*/
          /*...query.categoryIds && {
              category: {
                name: In (query.categoryIds)
              }
            },  */               
              
          /*},*/
      },
      order: {
          ...query.sortBy === undefined && {
              creationDate: 'DESC',
          },
          ...(query.sortBy === 'ASC' || query.sortBy === 'DESC') && {
            creationDate: query.sortBy,
        }
      },
    };
    return this.projectRepository.find(criteria);
  }

}
