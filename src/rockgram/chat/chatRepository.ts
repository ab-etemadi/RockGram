import { Injectable } from "@nestjs/common";
import {  CreateGroupChatDto } from './dto/create-group-chat.dto';
import { AbstractRepository, EntityRepository, Repository } from "typeorm";
import { User } from "../user/user.entity";
import { Chat } from "./chat.entity";
import { CreatePersonalChatDto } from "./dto/create-personal-chat.dto";
import { UpdateChatDto } from "./dto/update-chat.dto";

@Injectable()
@EntityRepository(Chat)
export class ChatRepository extends AbstractRepository<Chat>{
    // constructor(
    //     @InjectRepository(User)
    //     private readonly userRepos: Repository<User>,
    // ){
    //     super();
    // }
    
    public async createPersonalChat(createPersonalChatDto: CreatePersonalChatDto, userId: number, name: string): Promise<Chat>{
        const  { memberId } = createPersonalChatDto;
        // const name = (await this.userRepos.findOne(userId)).fullname +" & "+(await this.userRepos.findOne(membersId[0])).fullname;

        const chat = new Chat();
        chat.name = name;
        chat.type = "personal"; 
        chat.userChat =  [{userId: userId, role: "Admin"},{userId: memberId, role: "Admin"}];

        console.log(chat)
        this.repository.create(chat);
        await this.repository.save(chat);
        return chat;
    }

    public async createGroupChat(createGroupChatDto: CreateGroupChatDto, userId: number): Promise<Chat>{
        let { name, type , userChat, membersId } = createGroupChatDto;
       
        type = "group";
        userChat = [{userId: userId, role: "Admin"}];
        for (let i = 0; i < membersId.length; i++) {
            userChat.push({userId: membersId[i], role: "member"});
        }

        const chat = new Chat();
        chat.name = name;
        chat.type = type; 
        chat.userChat = userChat;

        this.repository.create(chat);
        await this.repository.save(chat);
        return chat;
    }

    public async updateGroupChat(updateChatDto: UpdateChatDto, chatId:number): Promise<Chat>{
        const { name } = updateChatDto;
        const chat = await this.repository.findOne(chatId);
        chat.name = name;
        await this.repository.save(chat);
        return chat;
    }




}