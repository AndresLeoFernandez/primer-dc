import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';
import { History } from 'src/history/entities/history.entity';
import { Collaborator } from 'src/collaborator/entities/collaborator.entity';
import { User } from 'src/user/entities/user.entity';
import { Project } from 'src/project/entities/project.entity';
@Injectable()
export class DocumentService {

  constructor(
    @InjectRepository(Document) private readonly documentRepository: Repository<Document>,
    @InjectRepository(Collaborator) private readonly collaboratorRepository: Repository<Collaborator>,
    @InjectRepository(History) private readonly historyRepository: Repository<History>
    ) {}

  async createDocument(dto: CreateDocumentDto,project:Project, author:Collaborator):Promise<Document> {
    const newDocument = new Document(dto.type,project,author);
    const document = await this.documentRepository.save(newDocument);
    const newHistory = new History(dto.title,document,author,dto.content,dto.messaggesLog);
    const history = await this.historyRepository.save(newHistory);
    document.setLastHistoryId(history.getHistoryId());
    const documentSaved = await this.documentRepository.save(document);
    return documentSaved;
  }
  
  async updateDocument(document:Document, dto: UpdateDocumentDto, author:Collaborator):Promise<Document> {
    const newHistory = new History(dto.title,document,author,dto.content,dto.messaggesLog);
    const history = await this.historyRepository.save(newHistory);
    document.setLastHistoryId(history.getHistoryId());
    const documentSaved = await this.documentRepository.save(document);
    return documentSaved;  
  }
  async getLastDocumentVersion(document:Document):Promise<any> {
    const criteria : FindOneOptions = { where: { historyId : document.getLastHistoryId()} }
    const lastVersion = this.historyRepository.findOneOrFail(criteria);
    return lastVersion;
  }

  async getHistoryDocument(document:Document):Promise<any> {
    const criteria : FindManyOptions = {
    relations:['document'], select: { document:{document:false}, historyId:true, messaggesLog:true, creationDate:true,}, where: { document: { documentId: document.getDocumentId(),},},};
    const currentHistories = this.historyRepository.find(criteria);
    return currentHistories;
  }


  async findAll(): Promise<Document[]> {
    return await this.documentRepository.find();
  }

  async getOne(id: number,userEntity?: User): Promise<Document| null> {
    const criteria : FindOneOptions = { where: { documentId: id } }
    let document = await this.documentRepository.findOne(criteria);
    if (!document)
      throw new NotFoundException('Document does not exists');
    return document;
  }  
  
  async findOne(id: number):Promise<Document | null> {
    const criteria : FindOneOptions = { where: { documentId: id } }
    let document = await this.documentRepository.findOne(criteria);
    if (!document)
      throw new NotFoundException('Document does not exists');
    return document;
  }

  async remove(id: number):Promise<Document | null> {
    const document = await this.findOne(id);
    if (!document) 
      throw new BadRequestException('Document not find');
    return await this.documentRepository.remove(document);
  }
}
