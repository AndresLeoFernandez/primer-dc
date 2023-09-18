import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString, IsNotEmpty, NotContains, MinLength, IsEmail, Matches } from "class-validator";
import { lowercaseString } from "src/helpers/utils.helpers";

export class LoginDto {
    @ApiProperty({ required: true, example: 'account@demo.com',})
    @IsEmail()
    @Transform(({ value }) => lowercaseString(value?.trim()))
    @IsNotEmpty()
    @NotContains(" ", { message: "No spaces allowed."})
    @Matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, {message: 'Email must be a type of email'})
    readonly email: string;

    @ApiProperty({ required: true, example: 'AqHtdd25',})
    @IsString()
    @IsNotEmpty()
    @NotContains(" ", { message: "No spaces allowed"})
    @MinLength(5, { message: 'Password should contain more than 5 letters' })
    readonly password: string;
}