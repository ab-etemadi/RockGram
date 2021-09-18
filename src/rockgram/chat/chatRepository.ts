import { Injectable } from "@nestjs/common";
import { CreateChatDto } from "src/rockgram/chat/dto/create-chat.dto";
import { AbstractRepository, EntityRepository } from "typeorm";
import { Chat } from "./chat.entity";
import { UpdateChatDto } from "./dto/update-chat.dto";

@Injectable()
@EntityRepository(Chat)
export class ChatRepository extends AbstractRepository<Chat>{

    
    public async createChat(createChatDto: CreateChatDto): Promise<Chat>{
        const { name, type , userChat } = createChatDto;
        const chat = new Chat();
        chat.name = name;
        chat.type = type; 
        chat.userChat = userChat;

        this.repository.create(chat);
        await this.repository.save(chat);
        return chat;
    }

    public async createGroupChat(createChatDto: CreateChatDto): Promise<Chat>{
        const { name, type , userChat } = createChatDto;
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