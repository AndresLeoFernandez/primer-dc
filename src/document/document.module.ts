import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { Document } from "src/document/entities/document.entity"
import { Collaborator } from "src/collaborator/entities/collaborator.entity";
import { Comment } from "src/comment/entities/comment.entity";
import { Project } from "src/project/entities/project.entity";
import { History } from "src/history/entities/history.entity";
import { UserModule } from 'src/user/user.module';


@Module({
  imports:[
    UserModule,
    TypeOrmModule.forFeature([Document,Collaborator,Comment,Project,History])],
  controllers: [DocumentController],
  providers: [DocumentService],
  exports:[DocumentService]
})
export class DocumentModule {}
