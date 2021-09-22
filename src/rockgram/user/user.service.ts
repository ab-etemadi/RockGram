/* eslint-disable prettier/prettier */
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){}


    findAll(){
        return this.userRepository.find({ relations: ["userChat"] });
    }


    async findOne(email: string): Promise<User | undefined>{
        const user = await this.userRepository.find({where: {email: email}});
        return user[0]

    }


    async findOneUser(id: string){
        const user = await this.userRepository.findOne(id);
        if (!user) {
            throw new NotFoundException(`User #(${id}) not found!`)
        }
        return user;

    }



    async createUser(createUserDto: CreateUserDto){
        const existingUser = await this.userRepository.findOne({where: {email:createUserDto.email}});
        if (existingUser) {
            throw new ConflictException(`User with email: ${existingUser.email} already exist! Please use anther email for sigup.`)
        }

        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }




    async updateUser(id: number, updateUserDto: UpdateUserDto){
        const user = await this.userRepository.findOne({where: {id: id}});
        if(user.password === updateUserDto.currentPassword){
        const user = await this.userRepository.preload({
            id: +id,
            password: updateUserDto.newPassword,
            fullname: updateUserDto.fullname
        });
        if (!user) {
            throw new NotFoundException(`User #(${id}) not found!`)
        }
        return this.userRepository.save(user);
    } else {
        throw new BadRequestException("passwords dont match with each other!")
    }
        
    }

    async deleteUser(id: string){
        const user = await this.findOneUser(id);
        return this.userRepository.remove(user);
    }

}
