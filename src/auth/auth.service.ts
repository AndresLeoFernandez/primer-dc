import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from 'src/user/entities/user.entity';
import { validateHash } from 'src/common/utils';
import { LoginDto } from './dto/Login.dto';
import { UserNotFoundException } from 'src/exceptions/user-not-found.exception';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}
    
  
  async validateUser(loginDto: LoginDto): Promise<User> {
    const user = await this.userService.findOneBy({ email: loginDto.email, });
    const isPasswordValid = await validateHash(loginDto.password, user?.getPassword(),);
    if (!isPasswordValid) {
      throw new UserNotFoundException();
    }
    return user!;
  }
    
  async login(loginDto: LoginDto):Promise<any> {
    const user = await this.userService.findOneBy({ email:loginDto.email });
    if (!user) 
      throw new NotFoundException('Usuario no encontrado')
    if (!(await compare(loginDto.password,user.getPassword())))
      throw new UnauthorizedException();
    const payload = {userId:user.getUserId(), email: user.getEmail() };
    return { access_token: await this.jwtService.signAsync(payload),}
  }

  async signOut(bearer:string){
    return 'chau'
  }
}
