
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString, IsNotEmpty, Validate, MaxLength, ValidateNested } from "class-validator";
import { Category } from "src/category/entities/category.entity";
import { lowercaseString } from "src/helpers/utils.helpers";

@ApiTags('CreateProjectDto')
export class CreateProjectDto {
    @ApiProperty({ type: () => String, required: true, example:'El proyecto de Prueba', description:'Title of Project.'})
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => lowercaseString(value))
    title: string;

    @ApiProperty({ type: () => String, required: true, example:'El proyecto se trara de...', description:'Description of Project.'})
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => lowercaseString(value))
    description: string;

    @ApiProperty({ type: () => String, required: true, example:'programing', description:'Category of the project.'})
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => lowercaseString(value))
    category: string;
}
