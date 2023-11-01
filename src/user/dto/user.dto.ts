import { IsString, IsOptional, IsNotEmpty, MinLength, IsEmail, Matches, NotContains, IsAlpha } from 'class-validator';
import { Transform } from 'class-transformer';
import { lowercaseString, sanitizeInput } from 'src/helpers/utils.helpers';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {

  @ApiProperty({type: () => String, required: true, example: 'Nombre',})
  @IsAlpha()
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeInput(value))
  @Matches(/^(?!\s*$).+/, { message: 'Name can not be empty or whitespace' })
  firstName?: string;
  
  @ApiProperty({type: () => String, required: true, example: 'Apellido',})
  @IsAlpha()
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeInput(value))
  @Matches(/^(?!\s*$).+/, { message: 'Name can not be empty or whitespace' })
  lastName?: string;

  @ApiProperty({type: () => String, required: true, example: 'Manue23',})
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @NotContains(" ", { message: "No spaces allowed"})
  @Transform(({ value }) => sanitizeInput(value))
  @MinLength(5, { message: 'Username should contain more than 5 letters' })
  username?: string;

  
  @ApiProperty({type: () => String, required: true, example: 'account@demo.com',})
  @IsEmail()
  @Transform(({ value }) => lowercaseString(value?.trim()))
  @IsNotEmpty()
  @NotContains(" ", { message: "No spaces allowed."})
  @Matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, {message: 'Email must be a type of email'})
  email: string;

}
