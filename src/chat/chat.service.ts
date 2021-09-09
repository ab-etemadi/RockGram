import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class ChatService {
  getMessages(chatId: number) {
    return `load all messages with this chat id: ${chatId}, messages of sender  apear in right side of chat`;
  }

  createMessage(message: CreateMessageDto) {
    return 'return the message text';
  }

  updateMessage(id: number, message: UpdateMessageDto) {
    return 'return the updated message text';
  }

  deleteMessage(id: number,userId:number) {
    return 'message deleted';
  }
}
