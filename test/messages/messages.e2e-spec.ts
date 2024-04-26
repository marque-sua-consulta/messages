import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../../src/app.module';
import { MessagesModule } from '../../src/messages/messages.module';
import { CreateMessageDto } from '../../src/messages/dto/create-message.dto';
import { UpdateMessageDto } from 'src/messages/dto/update-message.dto';
import { Model } from 'mongoose';
import { Message } from 'src/messages/entities/message.entity';
import { getModelToken } from '@nestjs/mongoose';

describe('AppController (e2e)', () => {
  const message = {
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
  let createdMessageId: string;
  const expectedPartialMessage = expect.objectContaining({
    ...message,
  });
  let app: INestApplication;
  let messageModel: Model<Message>;

  beforeAll(async () => {
    try {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule, MessagesModule],
      }).compile();

      app = moduleFixture.createNestApplication();
      app.useGlobalPipes(
        new ValidationPipe({
          whitelist: true,
          transform: true,
          forbidNonWhitelisted: true,
          transformOptions: {
            enableImplicitConversion: true,
          },
        }),
      );

      messageModel = moduleFixture.get<Model<Message>>(
        getModelToken('Message'),
      );

      await app.init();
    } catch (error) {
      console.error('Failed to initialize app:', error);
      process.exit(1); // Terminates the test process if initialization fails
    }
  });

  beforeEach(async () => {
    // Cria a mensagem antes de cada teste
    await messageModel.deleteMany({});

    const response = await request(app.getHttpServer())
      .post('/messages')
      .send(message as CreateMessageDto);
    createdMessageId = response.body._id;
  });

  it('Create Message [POST /]', () => {
    return request(app.getHttpServer())
      .post('/messages')
      .send(message as CreateMessageDto)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        createdMessageId = body.id;
        expect(body).toEqual(expectedPartialMessage);
      });
  });

  it('Get all [GET /]', () => {
    return request(app.getHttpServer())
      .get('/messages')
      .then(({ body }) => {
        console.log(body);
        expect(body.length).toBeGreaterThan(0);
        expect(body[0]).toEqual(expectedPartialMessage);
      });
  });

  it('Get one [GET /:id]', () => {
    expect(createdMessageId).toBeDefined();

    return request(app.getHttpServer())
      .get(`/messages/${createdMessageId}`)
      .then(({ body }) => {
        expect(body).toEqual(expectedPartialMessage);
      });
  });
  it.todo('Mark as Read one [PATCH /messages/:id/read]');

  it('Mark as Read one [PATCH /messages/:id/read]', () => {
    const updatedMessageDto: UpdateMessageDto = {
      ...message,
    };

    return request(app.getHttpServer())
      .patch(`/messages/${createdMessageId}/read`)
      .send(updatedMessageDto)
      .then(({ body }) => {
        expect(body.messageRead).toEqual(true);
      });
  });

  afterAll(async () => {
    await messageModel.deleteMany({});
    if (app) {
      await app.close();
    }
  });
});
