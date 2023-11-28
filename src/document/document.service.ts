import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { FindManyOptions, FindOneOptions, FindOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';
import { History } from 'src/history/entities/history.entity';
import { Collaborator } from 'src/collaborator/entities/collaborator.entity';
import { User } from 'src/user/entities/user.entity';
import { Project } from 'src/project/entities/project.entity';
import { Comment } from 'src/comment/entities/comment.entity';
@Injectable()
export class DocumentService {

  constructor(
    @InjectRepository(Document) private readonly documentRepository: Repository<Document>,
    @InjectRepository(Collaborator) private readonly collaboratorRepository: Repository<Collaborator>,
    @InjectRepository(History) private readonly historyRepository: Repository<History>,
    @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>
    ) {}

  async createDocument(dto: CreateDocumentDto,project:Project, author:Collaborator):Promise<Document> {
    /* como mejora se puede requerir en CreateDocumentDto el type*/
    /* Una vez incorporado modificar creacion del document con los siguientes parametros
    * const newDocument = new Document(dto.type,project,author);
    */
    const newDocument = new Document('Text',project,author);
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
  /**
   * Elimina documento y todas las histories relacionadas
   * 
   *  */
  async deleteDocument(document:Document) {
    const criteriaHistories : FindManyOptions = {where:{document: document.getDocumentId()}}
    const histories = await this.historyRepository.find(criteriaHistories)
    for (const history of histories) {
      void await this.historyRepository.delete(history.getHistoryId());
    }
    console.log(`Se eliminaron las histories de ${document.getDocumentId()}`)
    void await this.documentRepository.remove(document);    

  }

  async getLastDocumentVersion(document:Document):Promise<any> {
    const criteria : FindOneOptions = {relations:['author'], where: { historyId : document.getLastHistoryId()} }
    const lastVersion = await this.historyRepository.findOneOrFail(criteria);
    lastVersion.setAddVisit();
    const lastVersionSaved = await this.historyRepository.save(lastVersion);
    document.setAddTotalVisits();
    void await this.documentRepository.save(document);
    
    return {
      "title":lastVersionSaved.getTitle(),
      "projectTitle":document.project.getTitle(),
      "creationDate":document.getCreationDate(),
      "historyId": document.getLastHistoryId(),
      "documentId": document.getDocumentId(),
      "authorColDocument": document.getAuthor().getCollaboratorId(),
      "authorColHistory": lastVersionSaved.getAuthor().getCollaboratorId(),
      "content":lastVersionSaved.getContent(),
      "totalVisits": document.getTotalVisits(),  
      "historyVisits":lastVersionSaved.getVisits(),
      "projectId": document.project.getProjectId(),
      "type":document.getType(),  
      "creationDateHistory":lastVersionSaved.getCreationDate(),      
    }
  }
/* pruebo de agregar el author*/
  async getHistoryDocument(documentId:number,historyId:number):Promise<History|null> {
    const criteriaDocument : FindOneOptions = {where:{ documentId: documentId}};
    const document = await this.documentRepository.findOne(criteriaDocument);
    if (!document)
    throw new NotFoundException('Document does not exist.');
    const criteriaHistory: FindOneOptions = {relations:['document','author'], where:{ historyId: historyId}};
    const history = await this.historyRepository.findOne(criteriaHistory);
    if (!history)
    throw new NotFoundException('History does not exist.');
    if (history.document.getDocumentId()!==documentId)
    throw new NotFoundException('Error data');
    return history
      
  }

  async getHistoriesDocument(document:Document):Promise<History[]> {
    const criteria : FindManyOptions = {
    relations:['document'], select: { document:{document:false}, historyId:true, messaggesLog:true, creationDate:true,visits:true}, where: { document: { documentId: document.getDocumentId(),},},};
    const currentHistories = await this.historyRepository.find(criteria);
    return currentHistories;
  }
  
  async getCommentDocument(document:Document):Promise<Comment[]> {
    const criteria : FindManyOptions = {
    relations:['document'], select: { document:{document:false},author:true, email:true , content: true, creationDate:true,}, where: { document: { documentId: document.getDocumentId(),},},};
    const currentComment = await this.commentRepository.find(criteria);
    return currentComment;
  }

  async getTotalVisitsDocument(document:Document):Promise<number> {
    const totalHistories = await this.getHistoriesDocument(document);
    let count: number = 0;
    for (const history of totalHistories) {
      count = count + history.getVisits();
    }
    return count
  }
  
  /*New*/
  /*
  h.title,
  h.visits as historyVisists,
  p.title as projectTitle,
  h.content,
  d.total_visits as totalVisits,
  d.creation_date as creationDate,
  p.project_id as projectId,
  d.type,
  h.documents_id as documentId,
  d.author_collaborator_id as authorColDocument,
  h.author_collaborator_id as authorRevision,
  d.last_history_id as historyId
  h.creation_date as creationDateHistory
  */
  async mostViewed():Promise<any[]>{
    const documents = await this.documentRepository.query(`select h.title, p.title as projectTitle, h.content, d.total_visits as totalVisits, d.creation_date as creationDate,p.project_id as projectId, d.type, h.documents_id as documentId, d.author_collaborator_id as authorColDocument, h.author_collaborator_id as authorColHistory, d.last_history_id as historyId, h.creation_date as creationDateHistory from documents d inner join histories h on d.last_history_id = h.history_id inner join projects p on p.project_id = d.projects_id order by d.total_visits DESC`);
    return documents;    
  }

  async mostRecent():Promise<Document[]>{
    let criteria : FindManyOptions = { order: { creationDate:'DESC',},}
    const documents = await this.documentRepository.find(criteria); 
    return  documents;
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
  /*
  * Dado un id de proyecto lo verifico y devuelvo array listado de documents acotado que posee
  formato es el siguiente:
  h.title,
  d.creation_date as creationDate,
  h.creation_date as creationDateHistory,
  h.history_id as historyId,
  h.documents_id as documentId,
  d.author_collaborator_id as authorColDocument,
   h.author_collaborator_id as authorColHistory
  */
  async getListDocumentsByProjectId(projectId:number):Promise<any[]| null> {
    return this.documentRepository.query(`select h.title, d.creation_date as creationDate,h.creation_date as creationDateHistory, h.history_id as historyId, h.documents_id as documentId, d.author_collaborator_id as authorColDocument, h.author_collaborator_id as authorColHistory from documents d inner join histories h on d.last_history_id = h.history_id where d.projects_id = ${projectId}`);
  }

  /*
  * Dado un id de proyecto retorna los documentos que posee
  */  
  async getDocumentsByProjectId(idproject:number):Promise<Document[]| null> {
    const criteria : FindManyOptions = {relations:['project'], where: { project:{ projectId: idproject },} }
    return this.documentRepository.find(criteria);     
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
  
  async projectHasDocument(idProject: number):Promise<Boolean>{
    const criteriaDocument : FindOneOptions = {relations:['project'], where: { project:{ projectId:idProject,}},};
    const document = await this.documentRepository.findOne(criteriaDocument);
    return !(document===null);
  }
}
