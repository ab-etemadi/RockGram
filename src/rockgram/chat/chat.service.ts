/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserChat } from "src/rockgram/user_chat/user-chat";
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from './entities/chat.entity';
import { ChatRepository } from './repository/chatRepository';
import { User } from '../user/entities/user.entity';
import { UpdateChatDto } from './dto/update-chat.dto';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat)
        private readonly chatRepo: Repository<Chat>,
        private customChatRepo : ChatRepository,
        @InjectRepository(UserChat)
        private readonly userChatRepos: Repository<UserChat>,
        @InjectRepository(User)
        private readonly userRepos: Repository<User>,
    ){}

    getAllChats(){
        return this.chatRepo.find({ relations: ["userChat","messages"]});
    }

    getAllChatsByType(user: number, type: string){
       const chats = this.chatRepo.find({where: {type: type}})
       return chats;
    }

    async createPersonalChat(createChatDto: CreateChatDto, userId: number){
        const { membersId } = createChatDto;
        createChatDto.type = "personal";
        createChatDto.name = (await this.userRepos.findOne(userId)).fullname +" & "+(await this.userRepos.findOne(membersId[0])).fullname;
        createChatDto.userChat = [{userId: userId, role: "Admin"},{userId: membersId[0], role: "Admin"}];
        return await this.customChatRepo.createChat(createChatDto);
    }

    async createGroupChat(createChatDto: CreateChatDto, userId: number){
        createChatDto.type = "group";
        createChatDto.userChat = [{userId: userId, role: "Admin"}];
        const { membersId } = createChatDto;
        for (let i = 0; i < membersId.length; i++) {
            createChatDto.userChat.push({userId: membersId[i], role: "member"});
        }
        return await this.customChatRepo.createGroupChat(createChatDto);  
    }

    async updateGroupChat(updateChatDto: UpdateChatDto, chatId: number){
        return this.customChatRepo.updateGroupChat(updateChatDto, chatId);
    }
    addGroupMember(chatId: number, userId: number){
        const member = this.userChatRepos.create({userId:userId, chatId: chatId, role: "member"});
        console.log(member);
        return this.userChatRepos.save(member);
    }

    async deleteChat(chatId: number, userId: number){
        const userChat = await this.userChatRepos.find({where: {chatId:chatId, userId:userId}});
        return this.userChatRepos.remove(userChat);
    }
}
