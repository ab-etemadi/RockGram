import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            iqnoreExpiration: false,
            secretOrKey: process.env.SECRET,
        });
    }

    async validate(payload: any){
        // const user = await this.userService.getById(payload.id);
        return {
            id: payload.sub,
            name: payload.name,
            // ...user
        };
    }
}