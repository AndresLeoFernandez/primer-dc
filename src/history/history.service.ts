import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { Document } from "src/document/entities/document.entity";
import { Collaborator } from "src/collaborator/entities/collaborator.entity";
import { CreateCollaboratorDto } from "src/collaborator/dto/create-collaborator.dto";
import { CreateDocumentDto } from "src/document/dto/create-document.dto";

@Injectable()
export class HistoryService {
  create(createHistoryDto: CreateHistoryDto) {
    return 'This action adds a new history';
  }

  findAll() {
    return `This action returns all history`;
  }

  findOne(id: number) {
    return `This action returns a #${id} history`;
  }

  update(id: number, updateHistoryDto: UpdateHistoryDto) {
    return `This action updates a #${id} history`;
  }

  remove(id: number) {
    return `This action removes a #${id} history`;
  }
}
