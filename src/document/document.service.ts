import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { FindOneOptions, Repository } from 'typeorm';
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
    console.log('Se guado documento');
    const newHistory = new History(dto.title,document,author,dto.content,dto.messaggesLog);
    const history = await this.historyRepository.save(newHistory);
    console.log('Se guado history');
    return document;
  }
  /*  throw new NotFoundException('El author del documento difiere del usuario actual');
  }*/

  async updateDocument(document:Document, dto: UpdateDocumentDto, author:Collaborator):Promise<Document> {
    /*const criteriaDocument : FindOneOptions = { where:{ documentId:id}};
    const document = await this.documentRepository.findOne(criteriaDocument);
    if (document) {*/
    console.log('=======+++=======');
    console.log(document);
    console.log(dto);
    console.log(author);
    console.log('=======+++=======');
    
      const newHistory = new History(dto.title,document,author,dto.content,dto.messaggesLog);
      const history = await this.historyRepository.save(newHistory);
      return document;  
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
