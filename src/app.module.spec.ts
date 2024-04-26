import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

describe('AppModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    // Mock the environment variables
    process.env.DATABASE_HOST = 'localhost';
    process.env.DATABASE_PORT = '27017';
    process.env.DATABASE_NAME = 'testdb';

    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should provide AppService', () => {
    const service = module.get<AppService>(AppService);
    expect(service).toBeDefined();
  });

  it('should provide AppController', () => {
    const controller = module.get<AppController>(AppController);
    expect(controller).toBeDefined();
  });

  afterEach(() => {
    delete process.env.DATABASE_HOST;
    delete process.env.DATABASE_PORT;
    delete process.env.DATABASE_NAME;
  });
});
