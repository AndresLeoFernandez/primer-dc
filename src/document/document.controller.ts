import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { DocumentService } from './document.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Document } from './entities/document.entity';
import { History } from 'src/history/entities/history.entity';
import { DocumentExistGuard } from 'src/guards/documentExist.guard';
import { CurrentDocument } from 'src/decorators/currentDocument.decorator';
import { Comment } from 'src/comment/entities/comment.entity';



@ApiTags('Document')
@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) 
  {}

  /* Suma visitas*/
  @UseGuards(DocumentExistGuard)
  @Get(':idDoc/view')
  @ApiOperation({summary: 'Get the last version of the document idDoc', description:'',})
  @ApiOkResponse({ status: 200, description: 'Provide a list of all your projects.'}) 
  @ApiResponse({ status: 404, description: 'Forbidden, no hay resultados.' })
  @ApiParam({ name: 'idDoc', description: 'Gets the document id',})
  async findLastDocumentVersion (
    @Param('idDoc') idDoc: number,
    @CurrentDocument() document: Document
  ): Promise<any> {
    return await this.documentService.getLastDocumentVersion(document);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard,DocumentExistGuard)
  @Get(':idDoc/histories')
  @ApiOperation({summary: 'Get all raw histories of the document idDoc', description:'',})
  @ApiOkResponse({ status: 200, description: 'Provide a list of all the document history.'}) 
  @ApiResponse({ status: 404, description: 'Forbidden, no hay resultados.' })
  @ApiParam({ name: 'idDoc', description: 'Gets the document id',})
  async findHistoriesDocument(
    @Param('idDoc') idDoc: number,
    @CurrentDocument() document: Document
  ): Promise<History[]> {
    return await this.documentService.getHistoriesDocument(document);
  }

  @UseGuards(DocumentExistGuard)
  @Get(':idDoc/total-visits')
  @ApiOperation({summary: 'Get total visits of the document idDoc', description:'',})
  @ApiOkResponse({ status: 200, description: 'Provide number of visits to the document.'}) 
  @ApiResponse({ status: 404, description: 'Forbidden, no hay resultados.' })
  @ApiParam({ name: 'idDoc', description: 'Gets the document id',})
  async getTotalVisitsDocument(
    @Param('idDoc') idDoc: number,
    @CurrentDocument() document: Document
  ): Promise<number> {
    return await this.documentService.getTotalVisitsDocument(document);
  }
  /*new*/
  /*como no requiere autorizacion 
  * debo enviar id del document y checkear la existecia dentro del servicio*/
  @Get(':idDoc/history/:idHis')
  @ApiOperation({summary: 'Get the history idHis of the document idDoc', description:'',})
  @ApiOkResponse({ status: 200, description: 'Provide data history to the document.'}) 
  @ApiResponse({ status: 404, description: 'Forbidden, no hay resultados.' })
  @ApiParam({ name: 'idDoc', description: 'Gets the document id',})
  @ApiParam({ name: 'idHis', description: 'Gets the history id',})
  async getHistoryDocument(
    @Param('idDoc') idDoc: number,
    @Param('idHis') idHis: number,
    ): Promise<History|null> {
    return await this.documentService.getHistoryDocument(idDoc,idHis);
  }


  @Get('most-viewed')
  @ApiOperation({summary: 'Lists all documents sorted by number of total visits.From most viewed to least seen', description:'',})
  @ApiOkResponse({ status: 200, description: 'List documents sorted by number of total visits.'}) 
  async mostViewed()
  {
    return this.documentService.mostViewed();
  }
  
  @Get('most-recent')
  @ApiOperation({summary: 'List all documents sorted by their creation date. Newest to oldest.'})
  @ApiOkResponse({ status: 200, description: 'List documents sorted by their creation date.'}) 
  async mostRecent()
  {
    return this.documentService.mostRecent();
  }
    
  @Get('/view/all')
  @ApiOperation({summary: 'Get all raw documents', description:'',})
  @ApiResponse({ status: 201, description: 'Give all the documents.'}) 
  async findAll():Promise<Document[]> {
    return this.documentService.findAll();
  }

  @UseGuards(DocumentExistGuard)
  @Get(':idDoc/comment')
  @ApiOperation({summary: 'Get comment of the document idDoc', description:'',})
  @ApiOkResponse({ status: 200, description: 'Provide comment to the document.'}) 
  @ApiResponse({ status: 404, description: 'Forbidden, no hay resultados.' })
  @ApiParam({ name: 'idDoc', description: 'Gets the document id',})
  async getCommentDocument(
    @Param('idDoc') idDoc: number,
    @CurrentDocument() document: Document
  ): Promise<Comment[]> {
    return await this.documentService.getCommentDocument(document);
  }
}
