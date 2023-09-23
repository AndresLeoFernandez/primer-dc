import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { Document } from './entities/document.entity';

@ApiTags('Document')
@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) 
  {}
  @ApiBearerAuth()
  @UseGuards(AuthGuard) 
  @Post('/add')
  @ApiOperation({summary: 'Create New Document and first history', description:'',})
  @ApiBody({type:CreateDocumentDto})
  createNewDocument(
    @Body() createDocumentDto: CreateDocumentDto,
    @User('userId') currentUserId:number
  ) {
      return this.documentService.createDocument(createDocumentDto,currentUserId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard) 
  @Post('/:id/edit')
  @ApiOperation({summary: 'Update Document, create new history', description:'',})
  @ApiBody({type:CreateDocumentDto})
  async updateDocument(
    @Param('documentId') documentId: number,
    @Body() updateDocumentDto: UpdateDocumentDto,
    @User('userId') currentUserId:number
  ):Promise <Document> {
      return this.documentService.updateDocument(documentId,updateDocumentDto);
  }

  @Get()
  findAll() {
    return this.documentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.documentService.getOne(id);
  }

  /*@Patch(':id')
  update(@Param('id') id: string, @Body() updateDocumentDto: UpdateDocumentDto) {
    return this.documentService.update(+id, updateDocumentDto);
  }*/

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentService.remove(+id);
  }
}