import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { getModelToken } from '@nestjs/mongoose';
import { Message } from './entities/message.entity';

describe('MessagesController', () => {
  let controller: MessagesController;
  let service: MessagesService;

  beforeEach(async () => {
    const mockMessagesService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      markAsRead: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [
        {
          provide: MessagesService,
          useValue: mockMessagesService,
        },
        {
          provide: getModelToken(Message.name),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get(MessagesController);
    service = module.get(MessagesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Add tests for each controller method
  describe('createMessage', () => {
    it('should call MessagesService.create', async () => {
      const dto = {
        senderId: '123e4567-e89b-12d3-a456-426614174000',
        senderName: 'João Silva',
        recipientId: '987e6543-e21b-12d3-a456-426614174969',
        recipientName: 'Nilse Fernanda',
        messageContent:
          'Olá, Maria! Espero que você esteja bem. Gostaria de agendar nossa reunião para a próxima semana.',
        linkUrl: 'https://www.exemplo.com/reuniao',
        deliveryType: 'push-message',
        messageType: 'internal-link',
      };
      await controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAllMessages', () => {
    it('should call MessagesService.findAll', async () => {
      const queryDto = {
        senderId: '123e4567-e89b-12d3-a456-426614174000',
        limit: 10,
        offset: 0,
        recipientId: '123e4567-e89b-12d3-a456-426614174000',
      };
      await controller.findAll(queryDto);
      expect(service.findAll).toHaveBeenCalledWith(queryDto);
    });
  });

  describe('findOneMessage', () => {
    it('should call MessagesService.findOne', async () => {
      const messageId = '1';
      await controller.findOne(messageId);
      expect(service.findOne).toHaveBeenCalledWith(messageId);
    });
  });

  describe('markMessageAsRead', () => {
    it('should call MessagesService.markAsRead', async () => {
      const messageId = '1';
      await controller.markAsRead(messageId);
      expect(service.markAsRead).toHaveBeenCalledWith(messageId);
    });
  });
});
