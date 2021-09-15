import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateChatDto } from "src/rockgram/chat/dto/create-chat.dto";
import { Entity, EntityRepository, Repository } from "typeorm";
import { CreateMessageDto } from "../dto/create-message.dto";
import { UpdateMessageDto } from "../dto/update-message.dto";
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
        // message.user = userId;
        // message.chat = chatId;

        await this.repo.create(message);
        await this.repo.save(message);
        return message;
    }

    public async updateMessage(messageId: number, message: UpdateMessageDto): Promise<Message> {
        const {text} = message;
        const msg = await this.repo.findOne(messageId);
        msg.text = text;
        
        await this.repo.save(msg);
        return msg;
    }

    public async deleteMessage(id: number, userId: number,){
        const msg = await this.repo.findOne(id, {relations : ["user"]});
        if (msg.user['id'] === userId){
            this.repo.delete(msg);
        } else {
            throw new BadRequestException("not deleted");
        }
    }


}