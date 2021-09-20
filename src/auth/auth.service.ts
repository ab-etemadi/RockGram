import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/rockgram/user/user.service';

@Injectable()
export class AuthService {
    constructor( private userService: UserService, private jwtService: JwtService){}


    async validateUser(email: string, password: string): Promise<any>{
        const user = await this.userService.findOne(email);
        if (user && user.password === password) {
            const { password, email, ...rest } = user;
            return rest;
        }

        return null;


    }

    async login(user: any){
        const payload = { name: user.fullname, sub: user.id};

        return {
            id: payload.sub,
            name: payload.name,
            access_token: this.jwtService.sign(payload),
        };
    }




}
