import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment } from './entities/comment.entity';
import { Document } from "src/document/entities/document.entity";


@Module({
  imports:[
    TypeOrmModule.forFeature([Comment,Document])],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
