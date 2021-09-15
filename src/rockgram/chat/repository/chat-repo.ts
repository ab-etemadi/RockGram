import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateChatDto } from "src/rockgram/chat/dto/create-chat.dto";
import { EntityRepository, Repository } from "typeorm";
import { Chat } from "../entities/chat.entity";

@Injectable()
@EntityRepository(Chat)
export class ChatRepository extends Repository<Chat> {
    // constructor(
        // @InjectRepository(Chat)
        // private readonly repo: Repository<Chat>,
    // ){}
    public async createChat(createChatDto: CreateChatDto, userChat: number[], msg: number[] ): Promise<Chat>{
        const { name, type } = createChatDto;
        const chat = new Chat();
        chat.name = name;
        chat.type = type; 
        chat.userChat = userChat;
        chat.messages = msg;

        await this.create(chat);
        await this.save(chat);

        return chat;
    }
}