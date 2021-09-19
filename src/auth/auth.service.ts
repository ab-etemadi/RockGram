import { Injectable } from '@nestjs/common';
import { UserService } from 'src/rockgram/user/user.service';

@Injectable()
export class AuthService {
    constructor( private userService: UserService ){}


    async validateUser(email: string, password: string): Promise<any>{
        const user = await this.userService.findOne(email);
        if (user && user.password === password) {
            const { password, email, ...rest } = user;
            return rest;
        }

        return null;


    }



}
