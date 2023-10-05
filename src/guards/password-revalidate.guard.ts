import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

const bcrypt = require('bcrypt');

@Injectable()
export class PasswordRevalidateGuard implements CanActivate {
  constructor(private userService: UserService) {}

  /**
    *  Autoriza acceso a procesar el endpoint 
    *  Si el param id se corresponde con un projectId valido y  
    *  user.userid es colaborador del proyecto verificando 
    *  en la tabla de colaboradores.
    * @param {string} email
    * @param {string} password
    * @returns {Promise<boolean>}
    * True si se verifica que email corresponde a un User existente
    * y el password igual al ingresado existe
    * Null si no existe el usuario
    * False caso contrario.
    */
  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.userService.findOneBy({email});
    if (!user) return null;
    const isVerified = await bcrypt.compare(password, user.getPassword());
    return isVerified;
  }

  /**
    *  Autoriza acceso a procesar el endpoint 
    *  Si el param id se corresponde con un projectId valido y  
    *  user.userid es colaborador del proyecto verificando 
    *  en la tabla de colaboradores.
    * @param {ExecutionContext} context
    * @returns {boolean | Promise<boolean>}
    * True si validateUser es TRUE,
    * False caso contrario.
    */
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateUser(request.user.email, request.body.currentPassword);
  }
}
