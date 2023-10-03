import { ApiProperty } from "@nestjs/swagger";
import { Project } from "src/project/entities/project.entity"
import {    Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('Categories')
export class Category {    

    @ApiProperty({  type: () => Number, example: 1, readOnly: true, description: 'Autoincremental integer value.'})
    @PrimaryGeneratedColumn({name:'category_id'})
    private categoryId: number;
    
    @ApiProperty({  type: () => String, required: true, example:'Software', description:'Name of the category.' })
    @Column()
    private name: string;

    @ApiProperty({  type: () => Date, example:'25-08-2023', description:'Date of registration in the system.' })
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    private createdAt: Date;

    @ApiProperty({  type: () => Date, example:'25-08-2023', description:'Date of last update in the system.' })
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    private updatedAt: Date;

    /* relations */

    @ApiProperty({ type: () => Project,isArray: true })
    @OneToMany(() => Project,(project) => project.category)
    projects: Project[];

    /*functions getters y setters*/
    
    public getCategoryId():number {
        return this.categoryId
    }
    public getName(): string {
        return this.name
    }
    public setName(newName:string ) {
        this.name = newName;
    }

    constructor(name: string) {
        this.name = name;
    }
} 