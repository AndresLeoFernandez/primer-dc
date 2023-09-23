import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Document } from "src/document/entities/document.entity";
import { Collaborator } from "src/collaborator/entities/collaborator.entity";
import { ApiProperty, ApiPropertyOptional, ApiTags } from "@nestjs/swagger";
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { Transform } from "class-transformer";
import { sanitizeInput } from "src/helpers/utils.helpers";

@ApiTags('History')
@Entity({ name:'Histories' })
export class History {

  @ApiProperty({  type: () => Number,example:4,description:'Autoincremental integer value.' })
  @IsInt()
  @PrimaryGeneratedColumn({ name:'history_id' })
  private historyId: number;
  
  
  @ApiProperty({  type: () => String, required: true, example:'Titulo del contenido a desarrollar', description:'Content title.' })
  /*@IsString()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeInput(value))
  @MinLength(1, { message: 'Title should contain more than 1 letters' })*/
  @Column({ name:'title',
            type:'varchar',
            length:255, 
          })
  private title: string;

  @ApiPropertyOptional({  type: () => String, required: true, example:'Aqui desarrolla el cuerpo del contenido', description:'Content body.' })
  @Column({ name:'content', type:'text',})
  private content?: string;

  @ApiProperty({  type: () => Date, example:'25-08-2023', description:'Date of registration in the system.' })
  @CreateDateColumn({ name:'creation_date',type: 'timestamp' })
  private creationDate: Date;
  
  @ApiPropertyOptional({  type: () => String, required: false, example:'Aqui desarrolla el cambio realizado del contenido', description:'Changes message.' })
  @Column({ name:'messagge_log', type:'varchar', length:255, default:'' })
  private messaggesLog?: string;  
  
  /* Relations */
  
  @ApiProperty({  type: () => Document, description:"History of document"})
  @ManyToOne(() => Document, (document) => document.histories, { nullable: false, onDelete: 'CASCADE',orphanedRowAction: 'delete'})
  @JoinColumn({name :'documents_id'})
  document: Document;
  
  @ApiProperty({ type: () => Collaborator })
  @ManyToOne(()=> Collaborator, (collaborator) => collaborator.user, { nullable: false })
  @JoinColumn({name :"author_collaborator_id"})
  author: Collaborator;

  /* functions getters and setters */
  
  public getHistoryId():number {
    return this.historyId
  }
  public getTitle():string {
    return this.title
  }
  public getCreationDate(): any {
    this.creationDate
  }
  public getAuthor(): Collaborator {
    return this.author
  }
  public getContent(): string {
    return this.content
  }
  public getMessageLog(): string {
    return this.messaggesLog
  }

  constructor(title: string,document: Document,author: Collaborator,content?: string,messaggesLog?: string){
    this.title = title;
    this.document = document;
    this.author = author;
    this.content = content;
    this.messaggesLog = messaggesLog;
  }  
}