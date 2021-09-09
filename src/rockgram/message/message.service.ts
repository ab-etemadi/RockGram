import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
<<<<<<< HEAD:src/rockgram/message/message.service.ts
export class MessageService {
  getMessages(chatId: number, senderId: number) {
    return `load all messages with this chat id: ${chatId}, messages of sender ${senderId} apear in right side of chat`;
=======
export class ChatService {
  getMessages(chatId: number) {
    return `load all messages with this chat id: ${chatId}, messages of sender  apear in right side of chat`;
>>>>>>> origin/master:src/chat/chat.service.ts
  }
  createMessage(message: CreateMessageDto) {
    return 'return the message text';
  }
  updateMessage(id: number, message: UpdateMessageDto) {
    return 'return the updated message text';
  }
<<<<<<< HEAD:src/rockgram/message/message.service.ts
  deleteMessage(id: number) {
=======

  deleteMessage(id: number,userId:number) {
>>>>>>> origin/master:src/chat/chat.service.ts
    return 'message deleted';
  }
}
