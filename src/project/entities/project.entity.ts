import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Document } from "src/document/entities/document.entity";
import { Collaborator } from "src/collaborator/entities/collaborator.entity";
import { User } from "src/user/entities/user.entity";
import { Category } from "src/category/entities/category.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

@Entity('Projects')
export class Project {
    
    @ApiProperty({  type: () => Number, example:4, readOnly: true, description:'Autoincremental integer value.' })
    @PrimaryGeneratedColumn({ name: 'project_id' })
    private projectId: number;

    @ApiProperty({ type: () => String, required: true,  example:'El libro de Gisela', description:'Title of Project.'  })
    @Column({ name:'title', type: 'varchar', length: 255, default: '', nullable: false })
    private title: string;

    @ApiProperty({  type: () => String, required: true, example:'Breve descripcion de lo que se desarrollara en el proyecto', description:'Project description.' })
    @Column({ name:'description', type: 'text', nullable: false })
    private description: string;

    @ApiProperty({  type: () => Date, example:'25-08-2023', description:'Date of registration in the system.' })
    @CreateDateColumn({ name:'creation_date', type: 'timestamp'})
    private readonly creationDate: Date;

    /* Relations */
    
    @ApiProperty({ type: () => User, required: true})
    @ManyToOne(()=> User, (user) => user.projects,{ nullable: false, })
    @JoinColumn({name :'authors_id'}, )
    author: User;

    @ApiProperty({ type: () => Category, required: true})
    @ManyToOne(()=> Category, (category) => category.projects,{ nullable: false,cascade:true },)
    @JoinColumn({name :'categories_id'})
    category: Category;       
    
    @ApiPropertyOptional({ type: () => Document, isArray: true })
    @OneToMany(()=> Document, (document) => document.project,{ nullable: true, cascade:true })
    documents?: Document[];

    @ApiPropertyOptional({  type: () => Collaborator, isArray: true })
    @OneToMany(()=> Collaborator, (collaborator) => collaborator.user,{cascade:true })
    collaborators?: Collaborator[];

    /* Functions getters and setters */

    public getProjectId():number {
        return this.projectId
    }
    public getTitle():string {
        return this.title
    }
    public getDescription():string {
        return this.description
    }
    public getCreationDate(): any {
        this.creationDate
    }
    public getAuthor(): User {
        return this.author
    }
    public getCategory(): Category {
        return this.category
    }
     
    public setTitle(newTitle: string): void {
        this.title = newTitle
    }
    public setDescription(newDescription: string): void {
        this.description = newDescription
    } 
    public setCategory(newCategory: Category): void {
        this.category = newCategory
    }

    constructor( title:string, description:string, author: User, category: Category,collaborators?: Collaborator[], documents?:Document[]){
        this.title = title;
        this.description = description;
        this.author = author;
        this.category = category;
        this.collaborators =  collaborators;
        this.documents = documents;
    }
}
