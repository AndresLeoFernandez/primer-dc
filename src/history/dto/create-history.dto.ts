import { IsNotEmpty, IsString, MinLength, MaxLength, Matches, IsOptional } from "class-validator";
import { Transform } from 'class-transformer';
import { lowercaseString, sanitizeInput } from 'src/helpers/utils.helpers';


export class CreateHistoryDto {

    @IsString({ message: 'El titulo debe contener solo caracteres alfanumericos.' })
    @IsNotEmpty({ message: 'El titulo no puede ser vacio.' })
    @Transform(({ value }) => lowercaseString(value?.trim()))
    @MinLength(1, { message: 'El titulo  debe contener al menos 3 letras.' })
    @MaxLength(255, { message: 'Se ha alcanzado la longitud máxima de letras para el titulo.' })
    @Matches(/^[a-zA-Z0-9-]*$/, {message: 'El titulo puede contener numeros, letras y guion medio unicamente.' })
    title: string;
  
    @IsString()
    @IsOptional()
    @Transform(({ value }) => sanitizeInput(value))
    @IsNotEmpty()
    content: string;
      
    @IsString()
    @IsOptional()
    @Transform(({ value }) => sanitizeInput(value))
    messaggesLog: string;  
}
