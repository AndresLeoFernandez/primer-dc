import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

const bcrypt = require('bcrypt');

@Injectable()
export class PasswordRevalidateGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string): Promise<boolean> {
     
    const user = await this.userService.findOneBy({email});

    if (!user) return null;

    const isVerified = await bcrypt.compare(password, user.getPassword());

    return isVerified;
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateUser(request.user.email, request.body.currentPassword);
  }
}
