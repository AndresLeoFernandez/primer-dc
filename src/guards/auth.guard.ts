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
    
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ??
        [];
        return type === 'Bearer' ? token : undefined;
    }
    
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
            /*console.log(request['user']);  */  
            request['currentuser'] = await this.userService.getOne(request.user.userId);
            /*console.log(`Este es CURRENT USER`);
            console.log(request['currentuser']);*/
        } catch {
        throw new UnauthorizedException('Token invalid');
        }
        return true;
    }
}