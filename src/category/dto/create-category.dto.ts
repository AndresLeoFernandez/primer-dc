import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({ type: () => String, required: true, example:'Economia', description:'Name of the Category.'})
    @IsString()
    @IsAlpha()
    @IsNotEmpty()
    readonly name: string;
}
