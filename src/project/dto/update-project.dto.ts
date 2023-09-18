import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { CreateProjectDto } from './create-project.dto';

/*import { Type } from "class-transformer";
import { Collaborator } from "src/collaborator/entities/collaborator.entity";
import { CreateDocumentDto } from "src/document/dto/create-document.dto";
import { CreateCollaboratorDto } from "src/collaborator/dto/create-collaborator.dto"; */


export class UpdateProjectDto extends PartialType(CreateProjectDto) {
    /*@ApiPropertyOptional({  type:[Collaborator],
                            required: false,
                            example: '',
                            description: 'List of collaborators in the project.'
    })
    @Type(()=>Collaborator)
    @ValidateNested({ each: true })
    collaborators?: CreateCollaboratorDto[];*/

    /*@ApiPropertyOptional({required: false, example:'158', description: 'Categories Ids of the Users Collaborators.'})
    @IsArray({ each:true })
    @IsNumber()
    @IsOptional()
    collaborators?: number[];*/
}
