import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateChatDto } from "src/rockgram/chat/dto/create-chat.dto";
import { Entity, EntityRepository, Repository } from "typeorm";
import { CreateMessageDto } from "../dto/create-message.dto";
import { Message } from "../entities/message.entity";

@Injectable()
@EntityRepository(Message)
export class CustomRepository {
    constructor(
        @InjectRepository(Message)
        private readonly repo: Repository<Message>,
    ){}
    public async createMesssage(createMessageDto: CreateMessageDto, userId: number, chatId: number ): Promise<Message>{
        const {text, date,} = createMessageDto;
        console.log(userId, chatId);
        const message = new Message();
        message.date = date;
        message.text = text; 
        message.user = userId;
        message.chat = chatId;

        await this.repo.create(message);
        await this.repo.save(message);
        return message;
    }
}