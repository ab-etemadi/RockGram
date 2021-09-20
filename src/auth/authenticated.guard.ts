import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";


@Injectable()
export class AuthenticatedGuard implements CanActivate{

    async canActivate(context: ExecutionContext){
        const requst = context.switchToHttp().getRequest();
        
        return requst.isAuthenticated();
    }
}