import { ApiProperty } from "@nestjs/swagger";
import { Document } from "src/document/entities/document.entity";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity({ name: 'Comments' })
export class Comment {
    
    @ApiProperty({  type: () => Number, example:1, readOnly: true, description:'Autoincremental integer value.' })
    @PrimaryGeneratedColumn({ name: 'comment_id' })
    private commentId: number;
  
    @ApiProperty({  type: () => String, required: true,  example:'Juan Carlos', description:'Comment author.'  })
    @Column({ name:'author' })
    private author: string;
    
    @ApiProperty({  type: () => String, required: true,  example:'cuenta@demo.com', description:'Email author.'  })
    @Column({ name:'email_comment_author' })
    private email: string;
    
    @Column({ name:'content', type:'text' })
    private content: string;
  
    @CreateDateColumn({ name:'creation_date' })
    readonly creationDate: Date;

    /* Relations */

    @ApiProperty({ type: () => Document, required: true})
    @ManyToOne(() => Document, (document) => document.comments, {nullable: false, onDelete: 'CASCADE',/*orphanedRowAction: 'delete'*/})
    @JoinColumn({name :'documents_id'})
    document: Document;   
    
    /* Functions getters and setters */

    public getCommentId():number {
        return this.commentId
    }
    public getAuthor():string {
        return this.author
    }
    public getCreationDate(): any {
        this.creationDate
    }
    public getEmailComentAuthor():string {
        return this.email
    }
        
    public getContent(): String {
        return this.content
    }

    constructor(author: string,email:string,content: string,document:Document ){
        this.author = author;
        this.email = email
        this.content = content;
        this.document = document;
    }

}
