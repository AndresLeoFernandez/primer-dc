import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString, IsAlpha, IsNotEmpty, IsDate, IsArray, ValidateNested, MinLength, MaxLength, Matches, IsOptional } from "class-validator";
import { lowercaseString, sanitizeInput } from "src/helpers/utils.helpers";
import { Collaborator } from "src/collaborator/entities/collaborator.entity";
import { Project } from "src/project/entities/project.entity";
import { History } from "src/history/entities/history.entity";
import { Column, CreateDateColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";


export class CreateDocumentDto {
    
    @ApiProperty({  type: () => String, required: true, example:'titulo', description:'title Document.' })
    @IsString({ message: 'El titulo debe contener solo caracteres alfanumericos.' })
    @IsNotEmpty({ message: 'El titulo no puede ser vacio.' })
    /*@Transform(({ value }) => lowercaseString(value?.trim()))*/
    @MinLength(1, { message: 'El titulo  debe contener al menos 1 letra.' })
    @MaxLength(255, { message: 'Se ha alcanzado la longitud máxima de letras para el titulo.' })
    /*@Matches(/^[a-zA-Z0-9-]*$/, {message: 'El titulo puede contener numeros, letras y guion medio unicamente.' })*/
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
    
    
    @ApiProperty({  type: () => String, required: true, example:'Text', description:'Type Document.' })
    @IsString()
    @IsAlpha()
    @IsNotEmpty()
    @Transform(({ value }) => sanitizeInput(value))
    @Column({ name:'type' })
    type: string;
    
}
