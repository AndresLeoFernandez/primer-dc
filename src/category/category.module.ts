import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from './entities/category.entity';
import { Project } from 'src/project/entities/project.entity';
import { UserModule } from 'src/user/user.module';
/*import { AllowedCategoryValidator } from 'src/project/dto/create-project.dto';*/

@Module({
  imports:[
    UserModule,
    TypeOrmModule.forFeature([Category,Project])],
  controllers: [CategoryController,],
  providers: [CategoryService]
})
export class CategoryModule {}
