import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";
import { lowercaseString } from "src/helpers/utils.helpers";

export class UserForgotPasswordDto {
    @IsEmail()
    @IsNotEmpty()
    @Transform(({ value }) => lowercaseString(value))
    email: string;
}