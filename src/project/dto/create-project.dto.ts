import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";
import { Category } from "src/category/entities/category.entity";

export class CreateProjectDto {

    @ApiProperty({  type: () => String, required: true, example:'El libro de Gisela', description:'Title of Project.'})
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({  type: () => Category, required: true, example:'programing', description: 'Category of the project.' })
    category: Category;   
    
}
