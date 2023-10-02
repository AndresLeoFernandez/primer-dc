import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CollaboratorService } from './collaborator.service';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { Collaborator } from './entities/collaborator.entity';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('Collaborator')
@Controller('collaborator')


export class CollaboratorController {
  constructor(private readonly collaboratorService: CollaboratorService)
  {}
    
  @UseGuards(AuthGuard)
  @Get('view/all')
  @ApiOperation({ summary: 'Get all raw collaborators', description:' Otorga listado en crudo de todos los colaboradores existentes en la aplicación.',})
  async findAll(): Promise<Collaborator[]> {
    return this.collaboratorService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get(':id/view')
  @ApiOperation({summary: 'Get collaborator by id', description:' la descripcion',})
  @ApiParam({ name: 'id', description: 'collaboratorId' })
  @ApiResponse({  status: 200, description: 'The found record', type: Collaborator })
  @ApiResponse({  status: 403, description: 'Forbidden.'})  
  async findOne( @Param('id', ParseIntPipe) id: number):Promise<Collaborator> {
    return this.collaboratorService.findOne(id);
  }
  
  @Delete(':id')
  @ApiOperation({summary: 'Delete Collaborator by id', description:' la descripcion',})
  @ApiParam({ name: 'id', description: 'collaboratorId' })
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.collaboratorService.remove(id);
  }
}
