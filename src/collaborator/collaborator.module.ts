import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollaboratorService } from './collaborator.service';
import { CollaboratorController } from './collaborator.controller';
import { Collaborator } from './entities/collaborator.entity';
import { Document } from "src/document/entities/document.entity";
import { Project } from "src/project/entities/project.entity";
import { User } from "src/user/entities/user.entity";
import { History } from "src/history/entities/history.entity";

@Module({
  imports:[
    TypeOrmModule.forFeature([Collaborator,Document,Project,User,History])],
    controllers: [CollaboratorController],
  providers: [CollaboratorService]
})
export class CollaboratorModule {}
