import { Body, Controller, Post } from "@nestjs/common";
import { Public } from "src/rockgram/common/decorators/public.decorators";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";

@Controller('auth')
export class AuthController{
    constructor(
        private readonly authService: AuthService,
    ){}
    
    @Post('/:login')
    login(@Body() loginDetail: AuthDto){
        return this.authService.login(loginDetail);
    }
}