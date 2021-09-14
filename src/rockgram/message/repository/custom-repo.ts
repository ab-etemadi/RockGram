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
    public async createMesssage(createMessageDto: CreateMessageDto): Promise<Message>{
        const {text, date, senderId, chatId} = createMessageDto;
        const message = new Message();
        message.date = date;
        await this.repo.save(message);
        return message;
    }
}