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
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();        
        const documentId = request.params.idDoc;
        const criteriaDocument : FindOneOptions = { where:{ documentId: documentId}};
        const document = await this.documentRepository.findOne(criteriaDocument);
        if (!document)
        throw new NotFoundException('Document does not exist.');
        request['currentdocument'] = document;
        console.log(`Este es CURRENT document`);
        console.log(request['currentdocument']);
        return true;
    }
}