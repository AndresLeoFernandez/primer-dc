import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { CommentService } from './comment.service';



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

  @ApiOperation({summary: 'Get all raw Comments', description:'',})
  @Get('/view/all')
  async findAll():Promise<Comment[]> {
    return this.commentService.findAll();
  }
  
  @ApiOperation({summary: 'Get comment by id', description:'',})
  @ApiParam({ name: 'id', description: 'comment Id' })
  @ApiResponse({  status: 200, description: 'The found record', type: Comment})
  @ApiResponse({  status: 403, description: 'Forbidden.' })
  @Get(':id/view')
  findOne(@Param('id', ParseIntPipe) id: number):Promise<Comment> {
    return this.commentService.findOne(id);
  }
}
