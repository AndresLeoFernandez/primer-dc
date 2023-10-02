import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { CommentModule } from './comment/comment.module';
import { CollaboratorModule } from './collaborator/collaborator.module';
import { CategoryModule } from './category/category.module';
import { DocumentModule } from './document/document.module';
import { HistoryModule } from './history/history.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "password",
      database: "primer_dc",
      entities: [
        "dist/**/**.entity{.ts,.js}"
      ],
      synchronize: /*true */ false
    }),
    AuthModule,
    UserModule,
    CategoryModule,
    CommentModule,
    CollaboratorModule,
    DocumentModule,
    /*HistoryModule,*/
    ProjectModule,    
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
