import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CollaboratorService } from './collaborator.service';

import { Collaborator } from './entities/collaborator.entity';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';



@ApiTags('Collaborator')
@Controller('collaborator')


export class CollaboratorController {
  constructor(private readonly collaboratorService: CollaboratorService)
  {}
  @Get('view/all')
  @ApiOperation({ summary: 'Get all raw collaborators', description:' Otorga listado en crudo de todos los colaboradores existentes en la aplicación.',})
  async findAll(): Promise<Collaborator[]> {
    return this.collaboratorService.findAll();
  }
  @Get(':id/view')
  @ApiOperation({summary: 'Get collaborator by id', description:' la descripcion',})
  @ApiParam({ name: 'id', description: 'collaboratorId' })
  @ApiResponse({  status: 200, description: 'The found record', type: Collaborator })
  @ApiResponse({  status: 403, description: 'Forbidden.'})  
  async findOne( @Param('id', ParseIntPipe) id: number):Promise<Collaborator> {
    return this.collaboratorService.findOne(id);
  }
  /*
  Se puede incorporar a futuro la funcionalidad de elimar verificando feachientemente que el colaborador es quien esta generando la baja y determinar que procedimiento seguir con respecto de los documentos que haya generado en el proyecto
  Ejemplo transferir al dueño del proyecto la autoria de los documentos u optar por eliminar todos los documentos que lo comprometen.-

  @Delete(':id')
  @ApiOperation({summary: 'Delete Collaborator by id', description:' la descripcion',})
  @ApiParam({ name: 'id', description: 'collaboratorId' })
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.collaboratorService.remove(id);
  }
  */
}
