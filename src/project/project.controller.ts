import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, UseGuards, Put, ParseArrayPipe } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse, ApiTags, ApiBearerAuth, ApiParam, ApiOkResponse } from '@nestjs/swagger';

import { ProjectService } from './project.service';

import { Project } from './entities/project.entity';
import { User } from 'src/user/entities/user.entity';
import { Collaborator } from 'src/collaborator/entities/collaborator.entity';
import { Document } from 'src/document/entities/document.entity';

import { CreateProjectDto } from './dto/create-project.dto';
import { CreateDocumentDto } from 'src/document/dto/create-document.dto';
import { EmailUserDto } from 'src/user/dto/email-User.dto';
import { UpdateDocumentDto } from 'src/document/dto/update-document.dto';

import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { CurrentProject } from 'src/decorators/currentProject.decorator';
import { CurrentCollaborator } from 'src/decorators/currentCollaborator.decorator';

import { AuthGuard } from 'src/guards/auth.guard';
import { ProjectOwnerGuard } from 'src/guards/projectOwner.guard';
import { ProjectCollaboratorGuard } from 'src/guards/projectCollaborator.guard';
import { ProjectExistGuard } from 'src/guards/projectExist.guard';
import { DocumentExistGuard } from 'src/guards/documentExist.guard';
import { CurrentDocument } from 'src/decorators/currentDocument.decorator';
import { DocumentService } from 'src/document/document.service';

@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly documentService: DocumentService,
) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard) 
  @Post('/add')
  @ApiOperation({summary: 'Create New Project', description:'',})
  @ApiBody({ type: CreateProjectDto })
  @ApiResponse({ status: 201, description: 'The Project has been successfully created.'})  
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Category not Found.' })
  @ApiResponse({ status: 406, description: 'Proyect does not exist.'})
  async createProject( 
    @Body() createProjectDto: CreateProjectDto,
    @CurrentUser() currentUser:User) {
    return await this.projectService.createProject(createProjectDto,currentUser);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard,ProjectExistGuard,ProjectOwnerGuard)
  @Post('/:id/add/collaborator')
  @ApiOperation({summary: 'Add Collaborator to Project', description:'',})
  @ApiParam({name:'id',type:Number, description:'Id of the project to add Collaborator'})
  @ApiBody({type: EmailUserDto, description:'Its mandatory email of the user to add.'})
  @ApiOkResponse({ status: 201, description: 'The collaborator has been asign.'})
  @ApiResponse({ status: 401, description: 'Unauthorized not Project owner.' })  
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'The email does not correspond to any user of the system.' })
  @ApiResponse({ status: 406, description: 'The collaborator already exists in the project.' })
  async addCollaborator(
    @Param('id',ParseIntPipe) id: number,
    @Body() emailUserDto: EmailUserDto,
    @CurrentProject() currentProject:Project,
  ){
      return await this.projectService.addCollaborator(emailUserDto.email,currentProject);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard,ProjectExistGuard,ProjectOwnerGuard,ProjectCollaboratorGuard)
  @ApiOperation({summary: 'Get Collaborators of the project', description:'',})
  @ApiOkResponse({ status: 200, description: 'Provide a list of all the Collaborators in the project id.'}) 
  @ApiResponse({ status: 404, description: 'Forbidden, no hay resultados.' })
  @ApiParam({ name: 'id', description: 'Get the project id',})
  @Get(':id/collaborators')
  async getCollaboratorsByProjectId(
    @Param('id',ParseIntPipe) id: number,
    @CurrentProject() project: Project,
    /*@CurrentUser() currentUser: User*/
    ):Promise<Collaborator[]>
    {
      return this.projectService.getCollaboratorsByProjectId(project,/*currentUser*/);
    }


  @ApiBearerAuth()
  @UseGuards(AuthGuard,ProjectExistGuard,ProjectOwnerGuard,ProjectCollaboratorGuard)
  @Delete('/:id/delete/collaborator')
  @ApiOperation({summary: 'Delete Collaborator to Project', description:'',})
  @ApiParam({name:'id',type:Number, description:'Id project to delete Collaborator'})
  @ApiBody({type: EmailUserDto, description:'Email user to delete.'})
  @ApiOkResponse({ status: 201, description: 'The collaborator has been delete.'})
  @ApiResponse({ status: 401, description: 'Unauthorized not Project owner.' })  
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'The email does not correspond to any user of the system.' })
  @ApiResponse({ status: 406, description: 'The collaborator not exists in the project.' })
  async deleteCollaborator(
    @Param('id',ParseIntPipe) id: number,
    @Body() emailUserDto: EmailUserDto,
    @CurrentProject() currentProject:Project,
    @CurrentUser() currentUser:User
    )
    {
      return await this.projectService.deleteCollaborator(currentUser,emailUserDto.email,currentProject);
    }

  @ApiBearerAuth()
  @UseGuards(AuthGuard,ProjectExistGuard,ProjectCollaboratorGuard)
  @Post(':id/add/document')
  @ApiOperation({summary: 'Add Document to Project', description:'To perform the operation the user must be logged in and must be the owner or collaborator of the project.',})
  @ApiParam({ name: 'id', description: 'Gets the project id',})
  @ApiBody({type:CreateDocumentDto, description: 'Add new document'})
  @ApiOkResponse({ status: 201, description: 'The document has been add to the proyect.'}) 
  @ApiResponse({ status: 401, description: 'Unauthorized log in the app'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async addDocument(
    @Param('id',ParseIntPipe) id: number,
    @Body() documentDto: CreateDocumentDto,
    @CurrentProject() currentProject:Project,
    @CurrentCollaborator() creator:Collaborator,   
  ){
    return await this.projectService.addDocument(currentProject,documentDto,creator);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard,ProjectExistGuard,ProjectCollaboratorGuard)
  @ApiOperation({summary: 'Get documents of the project', description:'',})
  @ApiOkResponse({ status: 200, description: 'Provide a list of all the document in the project id.'}) 
  @ApiResponse({ status: 404, description: 'Forbidden, no hay resultados.' })
  @ApiParam({ name: 'id', description: 'Get the project id',})
  @Get(':id/documents')
  async getDocumentsByProjectId(
    @Param('id',ParseIntPipe) id: number,
    @CurrentProject() project: Project
    ):Promise<Document[]>
    {
      return await this.documentService.getDocumentsByProjectId(project.getProjectId())
    }

   
  @ApiBearerAuth()
  @UseGuards(AuthGuard,ProjectExistGuard,ProjectCollaboratorGuard,DocumentExistGuard)
  @Put(':id/edit/:idDoc/')
  @ApiOperation({summary: 'Add Document to Project', description:'To perform the operation the user must be logged in and must be the owner or collaborator of the project.',})
  @ApiParam({ name: 'id', description: 'Gets the project id',})
  @ApiParam({ name: 'idDoc', description: 'Gets the document id',})
  @ApiBody({type:UpdateDocumentDto, description: 'Add new document'})
  @ApiOkResponse({ status: 201, description: 'The document has been add to the proyect.'}) 
  @ApiResponse({ status: 401, description: 'Unauthorized log in the app'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async editDocument(
    @Param('id',ParseIntPipe) id: number,
    @Param('idDoc',ParseIntPipe) idDoc: number,
    @Body() documentDto: UpdateDocumentDto,
    @CurrentCollaborator() creator:Collaborator,
    @CurrentDocument() currentDocument:Document   
  ){
    return await this.projectService.editDocument(currentDocument,documentDto,creator);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/my-projects')
  @ApiOperation({summary: 'Get all projects where the current user is the owner', description:'',})
  @ApiOkResponse({ status: 200, description: 'Provide a list of all your projects.'}) 
  @ApiResponse({ status: 404, description: 'Forbidden, no hay resultados.' })
  async getProjectsOwner(
    @CurrentUser() currentUser:User
  ): Promise<Project[]> {
    return await this.projectService.getProjectsOwner(currentUser);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/my-collaboration-projects')
  @ApiOperation({summary: 'Get all projects where the current user is collaborator', description:'',})
  @ApiOkResponse({ status: 200, description: 'Provide a list of all projects where current user collaborator.'}) 
  @ApiResponse({ status: 404, description: 'Forbidden, no hay resultados.' })
  async getProjectsCollaborators(
    @CurrentUser() currentUser:User
  ): Promise<Project[]> {
    return await this.projectService.getProjectsCollaborator(currentUser);
  }

  @Get('view/all')
  @ApiOperation({summary: 'Obtain all Projects', description:'',})
  @ApiOkResponse({ status: 200, description: 'Give all the Projects.'}) 
  @ApiResponse({ status: 404, description: 'Forbidden, no hay resultados.' })
  async getProyects(): Promise<Project[]> {
    return await this.projectService.getProjects();
  }

  @Get('/:id/view')
  @ApiOperation({summary: 'Obtain Project by id', description:'',})
  @ApiOkResponse({  status: 200, description: 'The found record', type: Project })
  @ApiResponse({  status: 403, description: 'Forbidden.'})  
  async getOne(@Param('id',ParseIntPipe) id: number):Promise<Project> {
    const data = this.projectService.getOne(id);
    return data
  }

  /*@Patch('edit/:id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }*/

  @ApiBearerAuth()
  @UseGuards(AuthGuard,ProjectExistGuard,ProjectOwnerGuard)
  @ApiOperation({summary: 'Delete Project', description:'',})
  @ApiOkResponse({ status: 200, description: 'The project has been delete.'})  
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 406, description: 'Project not deleted. Require not have documents for execute operation.' })
  @Delete('/:id/delete')
  deleteProject( 
    @Param('id',ParseIntPipe ) id: number,
    @CurrentProject() currentProject:Project,
    @CurrentUser() currentUser:User
  ){
    return this.projectService.deleteProject(currentProject,currentUser);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard,ProjectExistGuard,ProjectOwnerGuard)
  @ApiOperation({summary: 'Delete Project', description:'',})
  @ApiOkResponse({ status: 200, description: 'The project has been delete.'})  
  @ApiResponse({ status: 401, description: 'Unauthorized log in the app'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 406, description: 'Project not deleted. Require not have documents for execute operation.' })
  @Delete('/:id/delete/documents')
  removeDocument( 
    @Param('id',ParseIntPipe ) id: number,
    @CurrentProject() currentProject:Project
  ){
    return this.projectService.removeDocuments(currentProject);
  }

  
}


