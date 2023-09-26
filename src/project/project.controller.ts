import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, UseGuards, Request, Put } from '@nestjs/common';
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

import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { CurrentProject } from 'src/common/decorators/currentProject.decorator';
import { CurrentCollaborator } from 'src/common/decorators/currentCollaborator.decorator';

import { AuthGuard } from 'src/auth/auth.guard';
import { ProjectOwnerGuard } from 'src/auth/projectOwner.guard';
import { ProjectCollaboratorGuard } from 'src/auth/projectCollaborator.guard';
import { ProjectExistGuard } from 'src/auth/projectExist.guard';
import { DocumentExistGuard } from 'src/auth/documentExist.guard';
import { CurrentDocument } from 'src/common/decorators/currentDocument.decorator';

@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService,
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
  async create( 
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
    /*console.log(id);
    console.log(idDoc);
    console.log('antes de entrar');*/
    return await this.projectService.editDocument(currentDocument,documentDto,creator);
  }



  @Get('view/all')
  @ApiOperation({summary: 'Obtain all Projects', description:'',})
  @ApiOkResponse({ status: 200, description: 'Give all the Projects.'}) 
  @ApiResponse({ status: 404, description: 'Forbidden, no hay resultados.' })
  async findAll(): Promise<Project[]> {
    return await this.projectService.getProjects();
  }

  @Get('/:id/view')
  @ApiOperation({summary: 'Obtain Project by id', description:'',})
  @ApiOkResponse({  status: 200, description: 'The found record', type: Project })
  @ApiResponse({  status: 403, description: 'Forbidden.'})  
  async findOne(@Param('id',ParseIntPipe) id: number):Promise<Project> {
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
  @Delete('/:id/delete')
  remove( 
    @Param('id',ParseIntPipe ) id: number,
    @Request() req
  ){
    return this.projectService.remove(req.currentproject);
  }
}


