
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString, IsNotEmpty, Validate, MaxLength, ValidateNested } from "class-validator";
import { Category } from "src/category/entities/category.entity";
import { lowercaseString } from "src/helpers/utils.helpers";

/*import { Validate, ValidatorConstraint, ValidatorConstraintInterface, MaxLength } from "class-validator";*/
/*import { Injectable } from "@nestjs/common";*/
/*import { CategoryService } from "src/category/category.service";*/
/*import { CategoryDto } from "src/category/dto/create-category.dto";*/

/*import { FindOneOptions, Repository } from "typeorm";*/

/*@ValidatorConstraint({ name: 'AllowedCategoryValidator', async: true })
@Injectable()
export class AllowedCategoryValidator implements ValidatorConstraintInterface {
  private errorMsg: string;

  constructor ( private readonly categoryService: CategoryService,)
  {}

  async validate(value: string) {
    const category = await this.categoryService.findOneByName(value);
    if (!category) {
        this.errorMsg = 'The category does not exist.';
        return false;
    }
    return true;
  }

  defaultMessage() {
    return this.errorMsg;
  }
}*/

export class CreateProjectDto {
    @ApiProperty({ type: () => String, required: true, example:'El libro de Gisela', description:'Title of Project.'})
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => lowercaseString(value))
    title: string;

    @ApiProperty({ type: () => String, required: true, example:'programing', description:'Category of the project.'})
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => lowercaseString(value))
    category: string;

    /*@ApiProperty({ type: () => Category, required: true, example:'programing', description: 'Category of the project.' })
    @ValidateNested()
    category: Category;  */ 

    /*@Validate(AllowedCategoryValidator)
    @IsString()
    @IsNotEmpty()
    @MaxLength(50, { message: 'Maximum length has been reached.' })
    categoryName: string;*/
  
}
