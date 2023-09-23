import { Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne, Column, Unique } from "typeorm";
import { Document } from "src/document/entities/document.entity";
import { Project } from "src/project/entities/project.entity";
import { User } from "src/user/entities/user.entity";
import { History } from "src/history/entities/history.entity";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsInt } from "class-validator";
import { RolesCollaborators } from "src/constants/roles-collaborators";

@ApiTags('Collaborator')
@Entity({ name: 'Collaborators' })
@Unique(["project", "user"])
export class Collaborator {
    @ApiProperty({  type: () => Number, example:4, readOnly: true, description:'Autoincremental integer value.' })
    /*@IsInt()*/
    @PrimaryGeneratedColumn({ name: 'collaborator_id' })
    collaboratorId: number;

    @ApiProperty({ enum: ['COLLABORATOR', 'OWNER']})
    @Column({ type: 'enum', enum: RolesCollaborators, default: RolesCollaborators.COLLABORATOR })
    role: RolesCollaborators;    
    
    /* Relations */

    @ApiProperty({ type: () => Project, required: true, description: '', example: ''})
    @ManyToOne(() => Project, (project) => project.collaborators, {nullable: false, onDelete: 'CASCADE',orphanedRowAction: 'delete'})
    @JoinColumn({ name:'projects_id' })
    project: Project
        
    @ApiProperty({  type: () => User,required: true,description: '',example: ''})
    @ManyToOne(() => User, (user) =>user.collaborators, {nullable: false})
    @JoinColumn({ name:'users_id' })
    user: User;
        
    @ApiProperty({  type: () => Document,required: true,description: '',example: ''})
    @OneToMany(()=> Document, (document) => document.author,{onDelete: 'CASCADE',orphanedRowAction: 'delete'})
    documents: Document[] 

    @ApiProperty({  type: () => History,required: true,description: '',example: ''})
    @OneToMany(()=> History, (history) => history.author,{onDelete: 'CASCADE',orphanedRowAction: 'delete'})
    histories: History[] 

    constructor(project: Project, user: User, role: RolesCollaborators, documents?: Document[],histories?: History[]){
        this.project = project;
        this.user = user;
        this.role = role;
        this.documents = documents;
        this.histories = histories;
    }


} 