import {  Injectable, NotFoundException, BadRequestException, ConflictException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions,Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from 'src/auth/dto/ChangePassword.dto';



@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>) {}
  
  /*
  * @Param id type number
  */
  async userExist (id : number ): Promise<boolean> {
      const criteria : FindOneOptions = {where:{ UserId: id }};
      let user : User = await this.userRepository.findOne(criteria);
      return (user != null);
  }
  
  async getUsers(): Promise<User[]> {
    try {
      return await this.userRepository.find()
    }catch (error){
      throw new NotFoundException(`Users does not exist.`);
    }
  }

  async getOne(id: number, userEntity?: User): Promise<User> {    
      const criteria : FindOneOptions = { where: { userId: id } }
      let user = await this.userRepository.findOne(criteria);
      if (!user) throw new NotFoundException(`User does not exists. Check if the id: ${id} is correct.`);
      return user  
  }  

  /*  find user by id or email   */
  async findOneBy( options: Partial<{ username: string;userId:number; email: string }>): Promise<User| null> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where(options)
      .addSelect('user.password')
      .getOne();
  }
  /*  create user if email is not in use before in the system  */
  async createUser(dto: CreateUserDto):Promise<any> {
    const criteria : FindOneOptions = { where:{ email: dto.email }}
    const userExist = await this.userRepository.findOne(criteria);
    if (userExist)
      throw new ConflictException('User already registered with this email');
    const newUser = new User(dto.firstName,dto.lastName,dto.email,dto.username,dto.password);
    const user = await this.userRepository.save(newUser);
    return {
      mensage:"Create succesfull",
      email:user.getEmail(),
      username:user.getUsername()
   };
  }

  /*  Edit field User but not is posible to change email!!! */
  async editUser (dto: UpdateUserDto, currentUser: User): Promise<User> {
    /*const currentUser = await this.buscarPorEmail(userEntity.email);*/
    const editedUser = Object.assign(currentUser, dto);
    return await this.userRepository.save(editedUser);    
  }


  async changePassword (dto: ChangePasswordDto, currentUser:User): Promise<User> {
    /*const currentUser = await this.buscarPorEmail(userEntity.email);    */
    const editedUser = Object.assign(currentUser, dto);
    return await this.userRepository.save(editedUser);     
  }

  /*  Delete user in the system  */
  async deleteUser (user:User): Promise<User> {
    return this.userRepository.remove(user);
    
  }

  async buscarPorEmail(email: string): Promise<User | null> {
    const criteria : FindOneOptions = { where:{ email: email }}
    return this.userRepository.findOne(criteria);
  }
}
