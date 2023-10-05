import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "../auth/constants";
import { Request } from "express";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor( 
        private jwtService: JwtService,
        private userService: UserService,       
        )
    {}
    /**
    * Recupera token del header
    * @param {Request} request
    * @returns {string | undefined}
    * token si se verifica
    * undefined caso contrario.
    *  */
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ??
        [];
        return type === 'Bearer' ? token : undefined;
    }
    
    /**
    *  Autoriza acceso a procesar el endpoint si el token de la request es valido.
    * @param {ExecutionContext} context
    * @returns {Promise<boolean>}
    * True si se verifica en token como valido
    * Exception en caso contrario
    * Obs: 
    *   1 - Genera key user en la request 
    *   2 - Genera key currentuser en la request 
    */
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();        
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException('Require log in');
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
            secret: jwtConstants.secret,
            });
            request['user'] = payload;
            request['currentuser'] = await this.userService.getOne(request.user.userId);
        } catch {
        throw new UnauthorizedException('Token invalid');
        }
        return true;
    }
}