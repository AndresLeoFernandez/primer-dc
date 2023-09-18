import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';
import { History } from 'src/history/entities/history.entity';
import { Collaborator } from 'src/collaborator/entities/collaborator.entity';
import { User } from 'src/user/entities/user.entity';
@Injectable()
export class DocumentService {

  constructor(
    @InjectRepository(Document) private readonly documentRepository: Repository<Document>,
    @InjectRepository(Collaborator) private readonly collaboratorRepository: Repository<Collaborator>,
    @InjectRepository(History) private readonly historyRepository: Repository<History>
    ) {}

  async createDocument(dto: CreateDocumentDto, currentUserId: number):Promise<Document> {
    const criteriaAuthor : FindOneOptions = { relations:['user'],where:{ collaboratorId:dto.author.collaboratorId}};
    const collaborator = await this.collaboratorRepository.findOne(criteriaAuthor);
    if (!collaborator)
      throw new NotFoundException('Collaborator does not exists');
    /*console.log(collaborator);*/
    if (collaborator.user.getUserId()===currentUserId){
      const newDocument = new Document(dto.type,dto.project,dto.author);
      const document = await this.documentRepository.save(newDocument);
      const newHistory = new History(dto.title,document,dto.author,dto.content,dto.messaggesLog);
      const history = await this.historyRepository.save(newHistory);
      return document;
    }
    throw new NotFoundException('El author del documento difiere del usuario actual');
  }

  async updateDocument(id: number, dto: UpdateDocumentDto):Promise<Document> {
    const criteriaDocument : FindOneOptions = { where:{ documentId:id}};
    const document = await this.documentRepository.findOne(criteriaDocument);
    if (document) {
      const newHistory = new History(dto.title,document,dto.author,dto.content,dto.messaggesLog);
      const history = await this.historyRepository.save(newHistory);
      return document;  
    }
    return null
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
