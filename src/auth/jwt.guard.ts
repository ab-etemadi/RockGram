import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/rockgram/common/decorators/public.decorators';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';



@Injectable()
export class JwtGuard extends AuthGuard('jwt'){}
// @Injectable()
// export class JwtGuard implements CanActivate {
//     constructor(
//         private readonly authService: AuthService,
//         private readonly reflector: Reflector 
//         ){
//     }
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
//     if(isPublic){
//         return true;
//     }
//     const request = context.switchToHttp().getRequest<Request>();
//     const authHeader = request.header('Authorization');
//     console.log("authHeader", authHeader);
//     console.log("toooken",this.authService.getToken());
//     if(this.authService.getToken() === authHeader){
//       return true;
//     }else {
//       throw new UnauthorizedException("UnAuthorized Request");
//     }
//   }
// }