import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

    findAll(){
        return `All User Well return soon!`;
    }

    findOneUser(email: string){
        return `Return User with #(${email})`;
    }

    createUser(createUserDto: CreateUserDto){
        return `User Created!`;
    }

    updateUser(id: string, updateUserDto: UpdateUserDto){
        return `User #(${id}) Updated!`
    }

    deleteUser(id: string){
        return `User #(${id}) deleted!`
    }

}
