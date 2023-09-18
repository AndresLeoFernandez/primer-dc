import { Project } from "src/project/entities/project.entity"
import {    Column,
            CreateDateColumn,
            Entity,
            OneToMany,
            PrimaryGeneratedColumn,
            UpdateDateColumn
        } from "typeorm"

@Entity('Categories')
export class Category {    

    @PrimaryGeneratedColumn({name:'category_id'})
    private categoryId: number;

    @Column()
    private name: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    private createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

    /* relations */

    @OneToMany(() => Project,(project) => project.category)
    projects: Project[];

    /*functions getters y setters*/
    
    public getCategoryId():number {
        return this.categoryId
    }
    public getName(): string {
        return this.name
    }
    public setName(newname:string ) {
        this.name = newname;
    }

    constructor(name: string) {
        this.name = name;
    }


} 