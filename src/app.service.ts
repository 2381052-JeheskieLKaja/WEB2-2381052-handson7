import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Jeheskiel Oktovio Theovelus Kaja';
  }
}
