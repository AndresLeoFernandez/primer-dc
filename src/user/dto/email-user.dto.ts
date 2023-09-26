import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, Matches, NotContains } from "class-validator";
import { IsEmailUserAlreadyExist } from "src/common/validators/isEmailUserAlreadyExist";
import { lowercaseString, sanitizeInput } from "src/helpers/utils.helpers";

export class EmailUserDto{
    @ApiProperty({ required: true, example: 'account@demo.com',})
    @Transform(({ value }) => sanitizeInput(value))
    @IsEmail()
    @Transform(({ value }) => lowercaseString(value?.trim()))
    @IsNotEmpty()
    @NotContains(" ", { message: "No spaces allowed."})
    /*@IsEmailUserAlreadyExist({message:"Email not register in the app."})*/
    email: string;
  }
  