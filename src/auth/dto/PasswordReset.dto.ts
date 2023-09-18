import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class AppPasswordResetDto {

    @IsString()
    @Transform(({ value }) => value?.trim())
    @IsNotEmpty()
    @MinLength(5, { message: 'Password should contain more than 5 letters' })
    password: string;

    @IsString()
    @IsNotEmpty()
    token: string;
}