import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { Collaborator } from "src/collaborator/entities/collaborator.entity";
import { Project } from "src/project/entities/project.entity";

@Module({
  imports:[
    TypeOrmModule.forFeature([User,Collaborator, Project])],
  controllers: [UserController],
  providers: [UserService,],
  exports:[UserService]
})
export class UserModule {}
