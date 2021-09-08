/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';

@Controller('chat')
export class ChatController {
    constructor(){
        console.log("chat controller")
    }
}


@Controller('user')
export class UserController{
    constructor(){
        console.log("user controller")
    }
}