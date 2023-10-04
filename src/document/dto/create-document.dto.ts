import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString, IsAlpha, IsNotEmpty, MinLength, MaxLength, IsOptional } from "class-validator";
import { sanitizeInput } from "src/helpers/utils.helpers";

export class CreateDocumentDto {
    
    @ApiProperty({  type: () => String, required: true, example:'titulo', description:'title Document.' })
    @IsString({ message: 'El titulo debe contener solo caracteres alfanumericos.' })
    @IsNotEmpty({ message: 'El titulo no puede ser vacio.' })
    @MinLength(1, { message: 'El titulo  debe contener al menos 1 letra.' })
    @MaxLength(255, { message: 'Se ha alcanzado la longitud máxima de letras para el titulo.' })
    title: string;
  
    @ApiProperty({  type: () => String, required: true, example:'Body document', description:'Body of the Document.' })
    @IsString()
    @Transform(({ value }) => sanitizeInput(value))
    @IsNotEmpty()
    content: string;
      
    @ApiPropertyOptional({  type: () => String, example:'This revisision change text', description:'Declare diferences in the document.' })
    @IsString()
    @IsOptional()
    @Transform(({ value }) => sanitizeInput(value))
    messaggesLog?: string;
    
    /* como mejora se puede requerir en CreateDocumentDto el type*/
    /* Una vez incorporado modificar creacion del document con los siguientes parametros
    * en document service  * const newDocument = new Document(dto.type,project,author);
    * y aqui habilitar.
    */
    /*@ApiProperty({  type: () => String, required: true, example:'Text', description:'Type Document.' })
    @IsString()
    @IsAlpha()
    @IsNotEmpty()
    @Transform(({ value }) => sanitizeInput(value))
    type: string;
    */
}
