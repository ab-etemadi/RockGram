import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { AbstractRepository, EntityRepository } from "typeorm";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { Message } from "./message.entity";
import { Request } from "express";
import { PaginationQueryDto } from "../common/paginationQuery.dto";
import { off } from "process";

@Injectable()
@EntityRepository(Message)
export class MessageRepository extends AbstractRepository<Message> {


    public async searchMessage(req : Request, chatId: number){
        const builder = await this.repository.createQueryBuilder('messages');
        if(req.query.s){
            builder.where("messages.text LIKE :s", {s: `%${req.query.s}%`})
            .andWhere("messages.chatId LIKE :i", {i: `%${chatId}%`});
        }
        return await builder.getMany();
    }

   
    public async getAllMessages(chatId: number, req: Request, paginationQuery: PaginationQueryDto){
        const {limit, offset} = paginationQuery;
        return await 
        this.repository
        .find({where: {chatId : chatId}, order: {date: "ASC"}, skip: offset, take: limit});
    }
    public async createMesssage(createMessageDto: CreateMessageDto, userId: number, chatId: number ): Promise<Message>{
        const {text} = createMessageDto; 
        const message = new Message();
        message.text = text; 
        message.date = new Date();
        message.userId = userId;
        message.chatId = chatId;

        await this.repository.create(message);
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