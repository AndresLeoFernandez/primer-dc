import { ApiProperty, ApiPropertyOptional, ApiTags } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsAlpha, IsArray, IsBoolean, IsDate, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Matches, MinLength, NotContains, ValidateNested } from "class-validator";
import { Collaborator } from "src/collaborator/entities/collaborator.entity";
import { lowercaseString, sanitizeInput } from "src/helpers/utils.helpers";
import { Project } from "src/project/entities/project.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { hash } from "bcryptjs";

@ApiTags('User')
@Entity('Users')
export class User {  

    @ApiProperty({  type: () => Number, example: 4, readOnly: true, description: 'Autoincremental integer value.'})
    /*@IsInt()*/
    @PrimaryGeneratedColumn({name:'user_id'})
    private userId: number;

    @ApiPropertyOptional({ type: () => String, required: false, example:'Gisela', description: 'First name.' })
    /*@IsAlpha()
	@IsOptional()*/
    @Column({ name: 'first_name', type: 'varchar', length: 50, default: '', nullable: true })
    private firstName?: string; 

    @ApiPropertyOptional({ type: () => String, required: false, example:'Fernandez', description: 'Last name.'})
    /*@IsAlpha()
    @IsOptional()*/
    @Column({ name: 'last_name', type: 'varchar', length: 50, default: '', nullable: true })
    private lastName?: string;

    @ApiProperty({ type: () => String, required: true, example: 'acount@enterprise.com', description: 'Personal Email unique in the sistem.' })
    /*@IsEmail()
    @Transform(({ value }) => lowercaseString(value?.trim()))
    @IsNotEmpty()
    @Matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, {message: 'Email must be a type of email'})
    @NotContains(' ')*/
    @Column({   name:'email', type:'varchar', length:255, default: '', unique: true, nullable: false })
    private email: string;   

    @ApiProperty({  type: () => String, required: true, example:'Maradoñano', description:'Username.' })
    /*@IsString()
    @IsAlpha()
    @IsNotEmpty()
    @Transform(({ value }) => sanitizeInput(value))
    @MinLength(5, { message: 'Username should contain more than 5 letters' })*/
    @Column({   name:'username', type:'varchar', default: '', length:16, /*unique: true */ })
    private username: string;

    @ApiProperty({ type: () => String, required: true, example: 'Manue23', description:'Password for access.' })
    /*@IsString()
    @IsAlpha()
    @IsNotEmpty()
    @Transform(({ value }) => sanitizeInput(value))
    @MinLength(5, { message: 'Username should contain more than 5 letters' })*/
    @Column({   name:'password', type:'varchar', length:255, default: '', nullable: false, select: false })
    private password: string;

    @ApiProperty({  type: () => Date, example:'25-08-2023', description:'Date of registration in the system.' })
    /*@IsDate()*/
    @CreateDateColumn({ name:'date_registration', type: 'timestamp' })
    private dateRegistration: Date;

    @ApiProperty({  type: () => Boolean, example:'True', description:'Status in the system.' })
    /*@IsBoolean()*/
    @Column({   type: 'bool', default: true })
    private isActive: boolean;
   
    /*  Attributes for relations  */

    @ApiProperty({ type: () => Project,isArray: true })
    /*@IsArray()
    @ValidateNested({ each: true })*/
    @OneToMany(() => Project, (project) => project.author, { nullable: false })
    public projects?: Project[]

    @ApiProperty({ type: () => Collaborator, isArray: true })
    /*@IsArray()
    @ValidateNested({ each: true })*/
    @OneToMany(() => Collaborator, (collaborator) => collaborator.user, { nullable: true })
    public collaborators?: Collaborator[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
      if (!this.password) {
        return;
      }
      this.password = await hash(this.password, 10);
    }
    
    
    /* functions getters & setters */

    public getUserId():number {
        return this.userId
    }
    public getFirstName():string {
        return this.firstName
    }
    public getLastName():string {
        return this.lastName
    }
    public getEmail(): string {
        return this.email
    } 
    public getUsername(): String  {
        return this.username
    }
    public getPassword(): string {
        return this.password
    }
    public getCollaborators(): Collaborator[]{
        return this.collaborators
    } 
    public getDateRegistration(): any {
        this.dateRegistration
    }
    public IsActive(): Boolean {
        return this.isActive
    }
    public setFirstName( newFirstName: string ): string {
        return this.firstName = newFirstName
    }
    public setLastName( newLastName: string ): string {
        return this.lastName= newLastName
    }
    public setPassword(newPassword: string): string {
        return this.password = newPassword
    }
    public deactivate() : void {
        this.isActive = false
    }

    /* Constructor */
    constructor(firstName: string , lastName: string , email: string , usernanme: string, password: string ){        
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = usernanme;
        this.password = password;        
    }
    /*constructor(partial: Partial<User>) {
        Object.assign(this, partial)
    }*/
}