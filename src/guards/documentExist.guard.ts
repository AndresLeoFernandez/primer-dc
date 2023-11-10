import { CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { Document } from "src/document/entities/document.entity";
/*
Este guard verifica que:
exista el docuemto conforme al idDoc
 crea en request currentdocument
*/

@Injectable()
export class DocumentExistGuard implements CanActivate {
    
    constructor( 
        @InjectRepository(Document) private readonly documentRepository: Repository<Document>)
    {}    
    
    /**
    *  Autoriza acceso a procesar el endpoint 
    *  Si el param idDoc se corresponde con un 
    *  documento valido en la tabla de documentos.
    * @param {ExecutionContext} context
    * @returns {Promise<boolean>}
    * True si se verifica que existe
    * Exception caso contrario
    * Obs: 
    *   1 - Genera key currentdocument en la request 
    */
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();        
        const documentId = request.params.idDoc;
        const criteriaDocument : FindOneOptions = {relations:['project','author'],select:{ project:{ title:true,projectId:true},author:{collaboratorId:true,}}, where:{ documentId: documentId}};
        const document = await this.documentRepository.findOne(criteriaDocument);
        if (!document)
        throw new NotFoundException('Document does not exist.');
        request['currentdocument'] = document;
        return true;
    }
}