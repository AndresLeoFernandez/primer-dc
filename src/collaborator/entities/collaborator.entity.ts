import { Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne, Column, Unique } from "typeorm";
import { Document } from "src/document/entities/document.entity";
import { Project } from "src/project/entities/project.entity";
import { User } from "src/user/entities/user.entity";
import { History } from "src/history/entities/history.entity";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { RolesCollaborators } from "src/constants/roles-collaborators";

@ApiTags('Collaborator')
@Entity({ name: 'Collaborators' })
@Unique(["project", "user"])
export class Collaborator {
    @ApiProperty({  type: () => Number, example:4, readOnly: true, description:'Autoincremental integer value.' })
    @PrimaryGeneratedColumn({ name: 'collaborator_id' })
    private collaboratorId: number;

    @ApiProperty({ enum: ['COLLABORATOR', 'OWNER']})
    @Column({ type: 'enum', enum: RolesCollaborators, default: RolesCollaborators.COLLABORATOR })
    private role: RolesCollaborators;    
    
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

    public getCollaboratorId():number {
        return this.collaboratorId
    }
    public getRole():any {
        return this.role
    }
    public getUser():User {
        return this.user
    }
    public getProject():Project {
        return this.project
    }

    constructor(project: Project, user: User, role: RolesCollaborators, documents?: Document[],histories?: History[]){
        this.project = project;
        this.user = user;
        this.role = role;
        this.documents = documents;
        this.histories = histories;
    }


} 