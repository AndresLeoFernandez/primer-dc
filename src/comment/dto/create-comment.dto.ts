import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, NotContains } from "class-validator";
import { lowercaseString, sanitizeInput } from "src/helpers/utils.helpers";

export class CreateCommentDto {

    @ApiProperty({ type: () => String, required: true, example: 'account@demo.com',})
    /*@Transform(({ value }) => sanitizeInput(value))*/
    @IsEmail()
    @Transform(({ value }) => lowercaseString(value?.trim()))
    @IsNotEmpty()
    @NotContains(" ", { message: "No spaces allowed."})
    email: string;
    
    @ApiProperty({ type: () => String, required: true, example: 'Juan', description: 'Name of comment author.' })
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => lowercaseString(value?.trim()))
    author: string;

    
    @ApiProperty({ type: () => String, required: true, example: 'Aqui desarrolla el cuerpo del comentario', description: 'Content of the comment.' })
    @IsString()
    @Transform(({ value }) => sanitizeInput(value))
    @IsNotEmpty()
    content: string;
}
