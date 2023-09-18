import {  Injectable,
          NotFoundException,
          BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions,Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface UserFindOne {
  id?: number;
  username?:string;
  email?: string;
}

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
  
  async getUsers(): Promise<User[]| null> {
    return await this.userRepository.find()
  }

  async getOne(id: number, userEntity?: User): Promise<User> {    
      const criteria : FindOneOptions = { where: { userId: id } }
      let user = await this.userRepository.findOne(criteria);
      if (!user)
        throw new NotFoundException(`User does not exists. Check if the id: ${id} is correct.`);
      return user;    
  }  
  /*  find user by id or email   */
  async findOneBy(data: UserFindOne): Promise<User| null> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where(data)
      .addSelect('user.password')
      .getOne();
  }
  /*  create user if email is not in use before in the system  */
  async createUser(dto: CreateUserDto):Promise<User> {
    const criteria : FindOneOptions = { where:{ email: dto.email }}
    const userExist = await this.userRepository.findOne(criteria);
    if (userExist)
      throw new BadRequestException('User already registered with email');
    const newUser = new User(dto.firstName,dto.lastName,dto.email,dto.username,dto.password);
    const user = await this.userRepository.save(newUser);
    return user;
  }

  /*  Edit field User but not is posible to change email!!! */
  async editUser (id: number, dto: UpdateUserDto, userEntity?: User): Promise<User| null> {
    const user = await this.getOne(id,userEntity);   
    if (user) {
      const editedUser = Object.assign(user, dto);
      return await this.userRepository.save(editedUser);
    }
    throw new BadRequestException('User not find');
  }
  /*  Delete user in the system  */
  async deleteUser (id: number, userEntity?: User): Promise<User| null> {
    const user = await this.getOne(id,userEntity);
    if (user) 
      return await this.userRepository.remove(user);
    throw new BadRequestException('User not find');
  }

  async buscarPorEmail(email: string): Promise<User | null> {
    const criteria : FindOneOptions = { where:{ email: email }}
    return this.userRepository.findOne(criteria);
  }
}
