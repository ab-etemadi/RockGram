/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
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

    createUser(createUserDto: CreateUserDto){
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto){
        const user = await this.userRepository.preload({
            id: +id,
            ...updateUserDto,
        });
        if (!user) {
            throw new NotFoundException(`User #(${id}) not found!`)
        }
        return this.userRepository.save(user);
        
    }

    async deleteUser(id: string){
        const user = await this.findOneUser(id);
        return this.userRepository.remove(user);
    }

}
