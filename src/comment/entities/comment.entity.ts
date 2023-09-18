import { Document } from "src/document/entities/document.entity";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity({ name: 'Comments' })
export class Comment {
    @PrimaryGeneratedColumn({ name: 'comment_id' })
    private commentId: number;
  
    @Column({ name:'author' })
    private author: string;
    
    @Column({ name:'content', type:'text' })
    private content: string;
  
    @CreateDateColumn({ name:'creation_date' })
    readonly creationDate: Date;

    @ManyToOne(() => Document, (document) => document.comments, {nullable: false })
    @JoinColumn({name :'documents_id'})
    document: Document;    
}
