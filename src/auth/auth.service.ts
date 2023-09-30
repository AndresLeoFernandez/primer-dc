import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from 'src/user/entities/user.entity';
import { validateHash } from 'src/common/utils';
import { LoginDto } from './dto/Login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}
    
 /**
 * validate user with hash
 * @param {LoginDto} loginDto
 * @returns {Promise<User>}
 */
  async validateUser(loginDto: LoginDto): Promise<User> {
    const user = await this.userService.findOneBy({ email: loginDto.email, });
    const isPasswordValid = await validateHash(loginDto.password, user?.getPassword(),);
    if (!isPasswordValid) {
      throw new NotFoundException();
    }
    return user!;
  }

  /**
 * Refresh user access 
 * @param {User} currentUser
 * @returns {Promise<any>}
 */
  async refresh(currentUser:User):Promise<any>{
    const payload = {userId:currentUser.getUserId(), email: currentUser.getEmail() };
    return { access_token: await this.jwtService.signAsync(payload),}
  }
  
  /**
 * Login user in the App 
 * @param {LoginDto} loginDto
 * @returns {Promise<any>}
 */  
  async login(loginDto: LoginDto):Promise<any> {
    const user = await this.userService.findOneBy({ email:loginDto.email });
    if (!user) 
      throw new NotFoundException('Usuario no encontrado')
    if (!(await compare(loginDto.password,user.getPassword())))
      throw new UnauthorizedException();
    const payload = {userId:user.getUserId(), email: user.getEmail() };
    return { access_token: await this.jwtService.signAsync(payload),}
  }
}
