import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  serverStatus(): object {
    return { server: 'on' };
  }
}
