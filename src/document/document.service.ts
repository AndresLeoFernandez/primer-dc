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
@Injectable()
export class DocumentService {

  constructor(
    @InjectRepository(Document) private readonly documentRepository: Repository<Document>,
    @InjectRepository(Collaborator) private readonly collaboratorRepository: Repository<Collaborator>,
    @InjectRepository(History) private readonly historyRepository: Repository<History>
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
    const criteria : FindOneOptions = { where: { historyId : document.getLastHistoryId()} }
    const lastVersion = await this.historyRepository.findOneOrFail(criteria);
    lastVersion.setAddVisit();
    const lastVersionSaved = await this.historyRepository.save(lastVersion);
    document.setAddVisit();
    void await this.documentRepository.save(document);
    /* agregar visits al proyecto  */
    return {
      "document": document,
     "lastVersion":lastVersionSaved,
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

  async getVisitsDocument(document:Document):Promise<number> {
    const totalHistories = await this.getHistoriesDocument(document);
    let count: number = 0;
    for (const history of totalHistories) {
      count = count + history.getVisits();
    }
    return count
  }
  /*async mostViewed():Promise<Document[]>{
    let criteria : FindManyOptions = { order: { visits:'DESC',},}
    const documents = await this.documentRepository.find(criteria); 
    return  documents;
  }*/
  /*New*/
  async mostViewed():Promise<any[]>{
    /*let criteria : FindManyOptions = {relations:['project','author','author.user',''], order: { visits:'DESC',},}*/
    //const documents = await this.documentRepository.find(criteria); 
    
    const documents = await this.documentRepository.query("select h.title,h.content,d.visits,d.creation_date as creationDate,p.project_id as projectId,p.title,d.type,h.documents_id as documentId, d.author_collaborator_id as authorDocument, h.author_collaborator_id as authorRevision from histories h inner join documents d on h.documents_id = d.last_history_id inner join projects p on p.project_id = d.projects_id order by d.visits desc");
    return  documents;    
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
  */
  async getListDocumentsByProjectId(idproject:number):Promise<any[]| null> {
    /*const criteria : FindManyOptions = {relations:['project'], where: { project:{ projectId: idproject },} }
    return this.documentRepository.find(criteria);     */
    return this.documentRepository.query(`select h.title,d.creation_date as creationDateDocument,h.creation_date as creationDateHistory,h.history_id as historyId,h.documents_id as documentId,d.author_collaborator_id as authorDocument, h.author_collaborator_id as authorRevision from histories h inner join documents d on h.documents_id = d.last_history_id inner join projects p on d.projects_id = p.project_id where p.project_id = ${idproject}`);
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
