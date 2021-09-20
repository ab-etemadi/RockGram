/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ){}


    @UseGuards(JwtAuthGuard)
    @Get()
    findAllUser(){
        return this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOneUser(@Param('id') id: string){
        return this.userService.findOneUser(id);
    }

    // @UseGuards(JwtAuthGuard)
    @Post()
    createUser(@Body() createUserDto: CreateUserDto){
        return this.userService.createUser(createUserDto);
    }


    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto){
        return this.userService.updateUser(id, updateUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteUser(@Param('id') id: string){
        return this.userService.deleteUser(id);
    }
}

