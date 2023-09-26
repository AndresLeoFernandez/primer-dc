import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentDto } from './create-document.dto';
import { Collaborator } from 'src/collaborator/entities/collaborator.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateDocumentDto extends CreateDocumentDto {}
