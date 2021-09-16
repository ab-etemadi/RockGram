import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateChatDto } from "src/rockgram/chat/dto/create-chat.dto";
import { UserChat } from "src/rockgram/user_chat/user-chat";
import { AbstractRepository, EntityRepository } from "typeorm";
import { Chat } from "../entities/chat.entity";

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


}