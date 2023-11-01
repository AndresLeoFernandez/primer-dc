import { IsString, IsOptional, IsNotEmpty, MinLength, IsEmail, Matches, NotContains, IsAlpha } from 'class-validator';
import { Transform } from 'class-transformer';
import { lowercaseString, sanitizeInput } from 'src/helpers/utils.helpers';
import { ApiProperty, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';

@ApiTags('CreateUserDto')
export class CreateUserDto {

  @ApiProperty({ type: () => String, required: true, example: 'cuenta@demo.com',})
  @IsEmail()
  @Transform(({ value }) => lowercaseString(value?.trim()))
  @IsNotEmpty()
  @NotContains(" ", { message: 'No spaces allowed.'})
  readonly email: string;

  @ApiProperty({ type: () => String, required: true, minLength: 5 , example: 'tomate',})
  @IsString()
  @IsNotEmpty()
  @NotContains(" ", { message: 'No spaces allowed.'})
  @MinLength(5, { message: 'Password should contain more than 5 letters.' })
  readonly password: string;

  @ApiProperty({type: () => String, required: true, example: 'Nombre',})
  @IsString()
  @NotContains(" ", { message: "No spaces allowed in firstname."})
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeInput(value))
  @Matches(/^(?!\s*$).+/, { message: 'Name can not be empty or have whitespace.' })
  readonly firstName?: string;
  
  @ApiProperty({ type: () => String, required: true, example: 'Apellido',})
  @IsString()
  @NotContains(" ", { message: "No spaces allowed in lastname."})
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeInput(value))
  @Matches(/^(?!\s*$).+/, { message: 'LastName can not be empty or have whitespace.' })
  readonly lastName?: string;

  @ApiProperty({ type: () => String, required: true, example: 'Manue23',})
  @IsString()
  @IsNotEmpty()
  @NotContains(" ", { message: "No spaces allowed."})
  @Transform(({ value }) => sanitizeInput(value))
  @MinLength(5, { message: 'Username should contain more than 5 letters.' })
  readonly username: string;
  
}
