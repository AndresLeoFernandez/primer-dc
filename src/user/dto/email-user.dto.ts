import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, NotContains } from "class-validator";
import { lowercaseString, sanitizeInput } from "src/helpers/utils.helpers";

export class EmailUserDto{
    @ApiProperty({type: () => String, required: true, example: 'account@demo.com',})
    @Transform(({ value }) => sanitizeInput(value))
    @IsEmail()
    @Transform(({ value }) => lowercaseString(value?.trim()))
    @IsNotEmpty()
    @NotContains(" ", { message: "No spaces allowed."})
    email: string;
  }
  