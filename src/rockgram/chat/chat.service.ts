/* eslint-disable prettier/prettier */
import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserChat } from "src/rockgram/user_chat/user-chat";
import {  CreateGroupChatDto } from './dto/create-group-chat.dto';
import { Chat } from './chat.entity';
import { ChatRepository } from './chatRepository';
import { User } from '../user/user.entity';
import { UpdateChatDto } from './dto/update-chat.dto';
import { CreatePersonalChatDto } from './dto/create-personal-chat.dto';
import { PaginationQueryDto } from '../common/paginationQuery.dto';
import { Request } from 'express';

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

    async getAllChatsByType(userId: number, type: string, paginationQuery: PaginationQueryDto){
       const {limit, offset} = paginationQuery;
       const chats = await this.chatRepo.createQueryBuilder('chats')
       .innerJoinAndSelect('chats.userChat', 'userChat')
       .where({ type: type,})
       .andWhere('userChat.userId = :userId', { userId: userId })
       .orderBy({'date': 'DESC'})
       .limit(limit)
       .offset(offset)
       .getMany();
       return chats;
    }

    async searchcht(req:Request, userId: number, ){
        return await this.customChatRepo.searchChat(req, userId,);
      }

    async createPersonalChat(createPersonalChatDto: CreatePersonalChatDto, userId: number){
        const { memberEmail } = createPersonalChatDto;
        
        const receiver = await this.userRepos.findOne({where: {email: memberEmail}});
        const existChat = await this.userChatRepos.findOne({where: {userId: userId, receiverId: receiver.id}});
        if(!existChat){
        const name = (await this.userRepos.findOne(userId))
                            .fullname +" & "+ receiver.fullname;
        return await this.customChatRepo.createPersonalChat(receiver.id, userId, name);
        } else {
            throw new ConflictException('chat exist');
        }
    }

    async createGroupChat(createGroupChatDto: CreateGroupChatDto, userId: number){
         let membersId = [];
        for(let i = 0; i < createGroupChatDto.membersEmail.length; i++){
           let user = await this.userRepos.findOne({where:{email: createGroupChatDto.membersEmail[i]}})
            membersId.push(user.id);
        }
        return await this.customChatRepo.createGroupChat(createGroupChatDto, userId, membersId);  
    }

    async updateGroupChat(updateChatDto: UpdateChatDto, chatId: number){
        return this.customChatRepo.updateGroupChat(updateChatDto, chatId);
    }
    
    async addGroupMember(chatId: number, userId: number){
        const member = this.userChatRepos.create({userId:userId, chatId: chatId, role: "member"})
        const existingMember = await this.userChatRepos.findOne({where: {chatId:chatId, userId:userId}});
        if (existingMember) {
            throw new ConflictException(`User with id: ${userId} already exist in this chat!`);
        }
        return this.userChatRepos.save(member);
    }

    async deleteChat(chatId: number, userId: number){
        const userChat = await this.userChatRepos.find({where: {chatId:chatId, userId:userId}});
        return this.userChatRepos.remove(userChat);
    }
}
