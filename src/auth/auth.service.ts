import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/rockgram/user/user.entity";
import { Repository } from "typeorm";
import { AuthDto } from "./dto/auth.dto";


@Injectable()
export class AuthService{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ){}
   async login(loginDetail: AuthDto) {
        const user = await this.userRepository.findOne({where: {email: loginDetail.email}});
        if(!user) throw new UnauthorizedException("Credential incorrect");
        if(user.password !== loginDetail.password)
         throw new UnauthorizedException('Credential incorrect');
        const token = this.signUser(user.id, user.email);
        return [{...user},token]
    }
    signUser(userId: number, email: string,){
         const token = this.jwtService.sign({
            id: userId,
            email,
        });
        return token;
    }

}