import { Collaborator } from "src/collaborator/entities/collaborator.entity";
import { Comment } from "src/comment/entities/comment.entity";
import { Project } from "src/project/entities/project.entity";
import { History } from "src/history/entities/history.entity";
import { Column, JoinColumn,CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty, ApiPropertyOptional, ApiTags } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsString, IsAlpha, IsNotEmpty, MinLength, IsDate, IsArray, ValidateNested } from "class-validator";
import { sanitizeInput } from "src/helpers/utils.helpers";
import { User } from "src/user/entities/user.entity";

@ApiTags('Document')
@Entity({ name: 'Documents' })
export class Document {
    
    @ApiProperty({  type: () => Number, example:4,readOnly: true, description:'Autoincremental integer value.' })
    @IsInt()
    @PrimaryGeneratedColumn({ name: 'document_id' })
    documentId: number;
  
    @ApiProperty({  type: () => String, required: true, example:'Text', description:'Type Document.' })
    @IsString()
    @IsAlpha()
    @IsNotEmpty()
    @Transform(({ value }) => sanitizeInput(value))
    @Column({ name:'type' })
    type: string;
    
    @ApiProperty({  type: () => Date, example:'25-08-2023', description:'Date of registration in the system.'})
    @IsDate()
    @CreateDateColumn({ name:'creation_date', type: 'timestamp' })
    private creationDate: Date;

    

    @ApiProperty({  type: () => Project, required: true})
    @ManyToOne(() => Project, (project) => project.documents,{ nullable: false })
    @JoinColumn({name :'projects_id' })
    project: Project;

    @ApiProperty({  type: () => Collaborator, required: true})
    @ManyToOne(() => Collaborator, (collaborator) => collaborator.documents,{ nullable: false })
    @JoinColumn({name :'author_collaborator_id'})
    author: Collaborator;

    @ApiPropertyOptional({  type: () => Project,isArray: true })
    @IsArray()
    @ValidateNested({ each: true })
    @OneToMany(() => Comment, (comment) => comment.document,{ nullable: false })
    comments?: Comment[];

    @ApiPropertyOptional({  type: () => History, isArray: true })
    @OneToMany( () => History,(history) => history.document)
    histories?: History[];

    /* functions getters and setters */
    public getDocumentId():number {
        return this.documentId
    }
    /*public getTitle():string {
        return this.title
    }*/
    public getCreationDate(): any {
        this.creationDate
    }
    
    public getType(): string {
        return this.type
    }
     
    /*public setTitle(newTitle: string): void {
        this.title = newTitle
    }*/
    constructor(type: string, project: Project,author: Collaborator,comments?: Comment[],histories?: History[]){
        this.type = type;
        this.project = project;
        this.author = author;
        this.comments = comments;
        this.histories = histories;
    }
}