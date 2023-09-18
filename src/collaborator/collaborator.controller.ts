import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CollaboratorService } from './collaborator.service';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { Collaborator } from './entities/collaborator.entity';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Collaborator')
@Controller('collaborator')
export class CollaboratorController {
  constructor(private readonly collaboratorService: CollaboratorService)
  {}

  @Post('/add')
  @ApiOperation({summary: 'Create new Collaborator', description:'',})
  @ApiBody({ type: CreateCollaboratorDto })
  @ApiResponse({  status: 201, description: 'The record has been successfully created.'})  
  @ApiResponse({  status: 404, description: 'Forbidden change.'})
  async create( @Body() createCollaboratorDto: CreateCollaboratorDto) {
    return this.collaboratorService.create(createCollaboratorDto);
  }

  @Get('view/all')
  @ApiOperation({ summary: 'Find all Collaborators', description:' Otorga todos los Colaboradores del sistema.',})
  async findAll(): Promise<Collaborator[]> {
    return this.collaboratorService.findAll();
  }

  @Get(':id/view')
  @ApiOperation({summary: 'Obtain Users by id', description:' la descripcion',})
  @ApiParam({ name: 'id', description: 'collaboratorId' })
  @ApiResponse({  status: 200, description: 'The found record', type: Collaborator })
  @ApiResponse({  status: 403, description: 'Forbidden.'})  
  async findOne( @Param('id', ParseIntPipe) id: number):Promise<Collaborator> {
    return this.collaboratorService.findOne(id);
  }


  /*@Get(':id')
  @ApiOperation({summary: 'Obtain Users by id', description:' la descripcion',})
  @ApiParam({ name: 'id', description: 'collaboratorId' })
  @ApiResponse({  status: 200, description: 'The found record', type: Collaborator })
  @ApiResponse({  status: 403, description: 'Forbidden.'})  
  async getAllCollaboratorByProject( @Param('id', ParseIntPipe) id: number):Promise<Collaborator> {
    return this.collaboratorService.findOne(id);
  }*/

  /*
  @Patch(':id')
  @ApiOperation({summary: 'Change Collaborator by id', description:' la descripcion',})
  @ApiParam({ name: 'id', description: 'collaboratorId' })
  @ApiBody({ type: UpdateCollaboratorDto })
  @ApiResponse({  status: 201, description: 'The record has been successfully modifier.'})  
  @ApiResponse({  status: 404, description: 'Forbidden change.'})
  update( @Param('id',ParseIntPipe) id: number, 
          @Body() updateCollaboratorDto: UpdateCollaboratorDto) {
    return this.collaboratorService.update(+id, updateCollaboratorDto);
  }
  */
 
  @Delete(':id')
  @ApiOperation({summary: 'Delete Collaborator by id', description:' la descripcion',})
  @ApiParam({ name: 'id', description: 'collaboratorId' })
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.collaboratorService.remove(id);
  }
}
