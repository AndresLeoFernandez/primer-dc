import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { User } from 'src/common/decorators/user.decorator';
import { User as UserEntity } from '../user/entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';/*add */
import { AuthService } from 'src/auth/auth.service';
import { RolesCollaborators } from 'src/constants/roles-collaborators';
import { UserDto } from 'src/user/dto/user.dto';

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
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})  
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create( @Body() createProjectDto: CreateProjectDto, @User('userId') currentUserId:number) {
    return await this.projectService.createProject(createProjectDto,currentUserId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('/:id/add/collaborator')
  @ApiOperation({summary: 'Add Collaborator to Project', description:'',})
  @ApiResponse({ status: 201, description: 'The collaborator has been asign.'})  
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async addCollaborator(
    @Param('id',ParseIntPipe) id: number,
    @Body() collaboratorDto: UserDto, 
    @User('email') currentUserEmail
  ){
    return await this.projectService.addCollaborator(id,RolesCollaborators.COLLABORATOR,collaboratorDto.email,currentUserEmail); 
  }
  
  /*@ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post(':id/add/document')
  @ApiOperation({summary: 'Add Document to Project', description:'',})
  @ApiResponse({ status: 201, description: 'The document has been add to the proyect.'})  
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async addDocument(
    @Param('id',ParseIntPipe) id: number,
    @Body() documentDto: DocumentDto,
    @User() author:any
  ){
    return await this.projectService.addDocument(id,documentDto,author.email);
  }*/
  
   
  @Get('view/all')
  @ApiOperation({summary: 'Obtain all Projects', description:'',})
  @ApiResponse({ status: 201, description: 'Give all the Projects.'}) 
  @ApiResponse({ status: 404, description: 'Forbidden, no hay resultados.' })
  async findAll(): Promise<Project[]> {
    return await this.projectService.getProjects();
  }

  @Get('/:id/view')
  @ApiOperation({summary: 'Obtain Project by id', description:'',})
  @ApiResponse({  status: 200, description: 'The found record', type: Project })
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
  @UseGuards(AuthGuard)
  @ApiOperation({summary: 'Delete Project', description:'',})
  @ApiResponse({ status: 201, description: 'The project has been delete.'})  
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete('/:id/delete')
  remove( @Param('id',ParseIntPipe ) id: number,
          @User('email') currentUserEmail) {
    return this.projectService.remove(id,currentUserEmail);
    /*Elimino todos los colaboradores del projecto*/
    /*Elimino todos los documentos del projecto*/
  }
}


