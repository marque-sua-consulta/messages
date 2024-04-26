import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagePaginationWrapperDTO } from './dto/pagination-message-wrapper.dto';
import { Message } from './entities/message.entity';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  @ApiQuery({
    name: 'senderId',
    required: false,
    type: String,
    description: 'UUID do remetente da mensagem',
  })
  @ApiQuery({
    name: 'recipientId',
    required: false,
    type: String,
    description: 'UUID do destinatário da mensagem',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Limite de mensagens retornadas',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Paginação de mensagens retornadas',
  })
  @ApiOkResponse({ description: 'Lista de mensagens', type: [Message] })
  findAll(@Query() queryWrapperDto: MessagePaginationWrapperDTO) {
    return this.messagesService.findAll(queryWrapperDto);
  }

  @Get(':id')
  @ApiQuery({
    name: 'id',
    required: false,
    type: String,
    description: 'ID da mensagem no MongoDB',
  })
  @ApiOkResponse({ description: 'Mensagem', type: Message })
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

  @Patch(':id/read')
  @ApiQuery({
    name: 'id',
    required: false,
    type: String,
    description: 'ID da mensagem no MongoDB',
  })
  @ApiOkResponse({
    description: 'Mensagem com o parâmetro messageRead true',
    type: Message,
  })
  update(@Param('id') id: string) {
    return this.messagesService.markAsRead(id);
  }
}
