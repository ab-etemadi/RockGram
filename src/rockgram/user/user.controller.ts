/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ){}


    @UseGuards(JwtGuard)
    @Get()
    findAllUser(){
        return this.userService.findAll();
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    findOneUser(@Param('id') id: string){
        return this.userService.findOneUser(id);
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto){
        return this.userService.createUser(createUserDto);
    }


    @UseGuards(JwtGuard)
    @Patch(':id')
    updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto){
        return this.userService.updateUser(id, updateUserDto);
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    deleteUser(@Param('id') id: string){
        return this.userService.deleteUser(id);
    }
}

