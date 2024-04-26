import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './entities/message.entity';
import { Model } from 'mongoose';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  create(createMessageDto: CreateMessageDto) {
    const message = new this.messageModel(createMessageDto);
    return message.save();
  }

  findAll(queryWrapperDto) {
    const filtros = {};
    if (queryWrapperDto.senderId) {
      filtros['senderId'] = queryWrapperDto.senderId;
    }
    if (queryWrapperDto.recipientId) {
      filtros['recipientId'] = queryWrapperDto.recipientId;
    }

    const { limit, offset } = queryWrapperDto;
    return this.messageModel
      .find({ ...filtros })
      .skip(offset)
      .limit(limit);
  }

  async findOne(id: string) {
    const message = await this.messageModel.findOne({ _id: id }).exec();
    if (!message) {
      throw new NotFoundException(`Message #${id} not found`);
    }
    return message;
  }

  async markAsRead(id: string) {
    const existingMessage = await this.messageModel
      .findOneAndUpdate({ _id: id }, { messageRead: true }, { new: true })
      .exec();

    if (!existingMessage) {
      throw new NotFoundException(`Message #${id} not found`);
    }
    return existingMessage;
  }
}
