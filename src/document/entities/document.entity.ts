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
    @PrimaryGeneratedColumn({ name: 'document_id' })
    private documentId: number;
  
    @ApiProperty({  type: () => String, required: true, example:'Text',default:"text", description:'Type Document.' })
    @Column({ name:'type' })
    private type: string;
    
    @ApiProperty({  type: () => Date, example:'25-08-2023', description:'Date of registration in the system.'})
    @CreateDateColumn({ name:'creation_date', type: 'timestamp' })
    private creationDate: Date;

    @ApiProperty({  type: () => Number, example:4,readOnly: true, default:1, description:'Value of the las history.' })
    @Column({ name: 'last_history_id' })
    private lastHistoryId: number;

    @ApiProperty({  type: () => Number, example:4,readOnly: true, default:0, description:'visits.' })
    @Column({ name: 'visits' })
    private visits: number;

    /* Relations */

    @ApiProperty({  type: () => Project, required: true})
    @ManyToOne(() => Project, (project) => project.documents,{ nullable: false, onDelete: 'CASCADE',orphanedRowAction: 'delete'})
    @JoinColumn({name :'projects_id' })
    project: Project;

    @ApiProperty({ type: () => Collaborator, required: true})
    @ManyToOne(() => Collaborator, (collaborator) => collaborator.documents,{ nullable: false,onDelete: 'CASCADE',orphanedRowAction: 'delete'})
    @JoinColumn({name :'author_collaborator_id'})
    author: Collaborator;

    @ApiPropertyOptional({  type: () => Project,isArray: true })
    @OneToMany(() => Comment, (comment) => comment.document,{ nullable: false,cascade: ["remove"]})
    comments?: Comment[];

    @ApiPropertyOptional({  type: () => History, isArray: true })
    @OneToMany( () => History,(history) => history.document,{cascade: ["remove"] })
    histories?: History[];

    /* Functions getters and setters */

    public getDocumentId():number {
        return this.documentId
    }
    
    public getCreationDate(): any {
        this.creationDate
    }
    
    public getType(): string {
        return this.type
    }

    public setLastHistoryId(newHistoryId:number){
        this.lastHistoryId = newHistoryId;
    }
    public getLastHistoryId():number {
        return this.lastHistoryId;
    }
    public getVisits():number{
        return this.visits;
    }
    public setAddVisit():number {
        this.visits++;
        return this.visits;
    }
            
    constructor(type: string, project: Project,author: Collaborator,comments?: Comment[],histories?: History[]){
        this.type = type;
        this.project = project;
        this.author = author;
        this.comments = comments;
        this.histories = histories;
        this.visits = 0;    
        this.lastHistoryId = 1;    
    }
}