import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Project } from './entities/project.entity';
import { Document } from "src/document/entities/document.entity";
import { Collaborator } from "src/collaborator/entities/collaborator.entity";
import { User } from "src/user/entities/user.entity";
import { Category } from "src/category/entities/category.entity";
import { DocumentModule } from 'src/document/document.module';
import { UserModule } from 'src/user/user.module';
/*import { IsEmailUserAlreadyExistConstraint } from 'src/common/validators/isEmailUserAlreadyExist';*/



@Module({
  imports:[
    UserModule,
    DocumentModule,
    TypeOrmModule.forFeature([Project,Document,Collaborator,User,Category]),],
  providers: [ProjectService,],
  controllers: [ProjectController],  
})
export class ProjectModule {}
