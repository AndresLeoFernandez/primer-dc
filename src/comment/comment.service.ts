import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Document } from 'src/document/entities/document.entity';


@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(Document) private readonly documentRepository: Repository<Document>,
    @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
  )
  {}

  async addComment(commentDto:CreateCommentDto, documentId:number): Promise <Comment> {
    const criteria : FindOneOptions = { where:{documentId:documentId }}
    const documentExist = await this.documentRepository.findOne(criteria);
    console.log(documentExist);
    if (!documentExist)
    throw new BadRequestException('The document does not exist');
    const newComent = new Comment(commentDto.author,commentDto.email,commentDto.content, documentExist);
    return this.commentRepository.save(newComent);
  }
  
  async findByEmail(email: string): Promise<Comment[]> {
    const criteria : FindManyOptions = { where:{ email: email }}
    const foundComments = await this.commentRepository.find(criteria);
    if (!foundComments) {
      throw new NotFoundException('With email ${email} not found comments.');
    }
    return foundComments;
  }

  async findAll() {
    return await this.commentRepository.find();
  }

  async findOne(id: number): Promise<any> {
    const criteria : FindOneOptions = { where:{ commentId:id }}
    const foundComment = await this.commentRepository.findOne(criteria);
    if (!foundComment) {
      throw new NotFoundException('Comment not found.');
    }
    return foundComment;
  }

  /*
  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }
  */

  async remove(id: number):Promise<any> {
    return await this.commentRepository.delete(id);
  }
}
