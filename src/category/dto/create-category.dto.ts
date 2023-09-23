import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { lowercaseString } from "src/helpers/utils.helpers";

export class CreateCategoryDto {
    @ApiProperty({ type: () => String, required: true, example:'Economia', description:'Name of the Category.'})
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => lowercaseString(value?.trim()))
    name: string;
}

/*export class CategoryDto extends CreateCategoryDto {}*/
