import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':idDoc')
  @ApiOperation({summary: 'Add Comment to Document', description:'',})
  @ApiParam({ name: 'idDoc', description: 'Get the document id to apply comment.',})
  @ApiBody({type:CreateCommentDto, description: 'Add new comment'})
  @ApiOkResponse({ status: 201, description: 'The commnent has been add to the document.'}) 
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(    
    @Param('idDoc',ParseIntPipe) idDoc: number,
    @Body() createCommentDto: CreateCommentDto    
    ){
      console.log(createCommentDto);
    return this.commentService.addComment(createCommentDto,idDoc);
  }



  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  /*@Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }*/

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
