import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from './messages.service';
import { Model } from 'mongoose';
import { Message } from './entities/message.entity';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';

describe('MessagesService', () => {
  let service: MessagesService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let model: Model<Message>;

  const mockMessageModel = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    save: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        {
          provide: getModelToken(Message.name),
          useValue: mockMessageModel,
        },
      ],
    }).compile();

    service = module.get(MessagesService);
    model = module.get(getModelToken(Message.name));

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a message', async () => {
      const createMessageDto = {
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

      const saveMock = jest.fn().mockResolvedValue(createMessageDto);
      const mockCreateModel = jest.fn().mockImplementation(() => ({
        save: saveMock,
      }));
      service = new MessagesService(mockCreateModel as any);

      await service.create(createMessageDto);

      // Verifica se save foi chamado
      expect(saveMock).toHaveBeenCalled();
      expect(mockCreateModel).toHaveBeenCalledWith(createMessageDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of messages', async () => {
      const result = [{ senderId: 'uuid', messageContent: 'Hello' }];
      mockMessageModel.find.mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue(result),
        }),
      });
      const queryWrapperDto = { limit: 10, offset: 0 };
      const messages = await service.findAll(queryWrapperDto);
      expect(messages).toEqual(result);
    });

    it('should return an array of messages send senderId', async () => {
      const result = [{ senderId: 'uuid', messageContent: 'Hello' }];
      mockMessageModel.find.mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue(result),
        }),
      });
      const queryWrapperDto = { senderId: 'uuid', limit: 10, offset: 0 };
      const messages = await service.findAll(queryWrapperDto);
      expect(messages).toEqual(result);
    });

    it('should return an array of messages send recipientId', async () => {
      const result = [{ senderId: 'uuid', messageContent: 'Hello' }];
      mockMessageModel.find.mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue(result),
        }),
      });
      const queryWrapperDto = { recipientId: 'uuid', limit: 10, offset: 0 };
      const messages = await service.findAll(queryWrapperDto);
      expect(messages).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should retrieve and return a message', async () => {
      const expectedMessage = {
        _id: '1',
        messageContent: 'Hello',
      };

      // Simula findOne para retornar um objeto com o método exec
      mockMessageModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(expectedMessage),
      });

      const foundMessage = await service.findOne('1');
      expect(foundMessage).toEqual(expectedMessage);
    });

    it('should throw a NotFoundException if message is not found', async () => {
      // Simula findOne para retornar um objeto com o método exec que resolve para null
      mockMessageModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('markAsRead', () => {
    it('should update message status to read', async () => {
      const updatedMessage = { _id: '1', messageRead: true };

      // Simula findOneAndUpdate para retornar um objeto com o método exec que resolve para updatedMessage
      mockMessageModel.findOneAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(updatedMessage),
      });

      const result = await service.markAsRead('1');
      expect(result).toEqual(updatedMessage);
    });

    it('should throw a NotFoundException if message to update is not found', async () => {
      // Simula findOneAndUpdate para retornar um objeto com o método exec que resolve para null
      mockMessageModel.findOneAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.markAsRead('1')).rejects.toThrow(NotFoundException);
    });
  });
});
