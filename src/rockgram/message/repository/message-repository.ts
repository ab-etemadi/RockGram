import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateChatDto } from "src/rockgram/chat/dto/create-chat.dto";
import { AbstractRepository, Entity, EntityRepository, Repository } from "typeorm";
import { CreateMessageDto } from "../dto/create-message.dto";
import { UpdateMessageDto } from "../dto/update-message.dto";
import { Message } from "../entities/message.entity";

@Injectable()
@EntityRepository(Message)
export class MessageRepository extends AbstractRepository<Message> {

   
    public getAllMessages(chatId: number){
        return this.repository.find({where: {chatId : chatId}});
    }
    public async createMesssage(createMessageDto: CreateMessageDto, userId: number, chatId: number ): Promise<Message>{
        const {text, date,} = createMessageDto;
        
        const message = new Message();
        message.date = date;
        message.text = text; 
        message.userId = userId;
        message.chatId = chatId;

        await this.repository.save(message);
        return message;
    }

    public async updateMessage(messageId: number, message: UpdateMessageDto, userId: number): Promise<Message> {
        const {text} = message;
        const msg = await this.repository.findOne(messageId, {relations : ["user"]});
        if(msg.user['id'] === userId){
        msg.text = text;
        } else {
            throw new BadRequestException("not updated");
        }
        
        await this.repository.save(msg);
        return msg;
    }

    public async deleteMessage(id: number, userId: number,){
        const msg = await this.repository.findOne(id, {relations : ["user"]});
        if (msg.user['id'] === userId){
            this.repository.delete(msg);
        } else {
            throw new BadRequestException("not deleted");
        }
    }


}