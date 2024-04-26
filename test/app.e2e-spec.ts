import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    jest.setTimeout(10000);
    try {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      app = moduleFixture.createNestApplication();
      await app.init();
    } catch (error) {
      console.error('Failed to initialize app:', error);
      process.exit(1); // Terminates the test process if initialization fails
    }
  });

  it('GET / should return 200 and { server: "on" }', async () => {
    await request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect({ server: 'on' });
  });

  it.todo('Create Message [POST /messages]');
  it.todo('Get all [GET /messages]');
  it.todo('Get one [GET /messages/:id]');
  it.todo('Mark as Read one [PATCH /messages/:id/read]');

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });
});
