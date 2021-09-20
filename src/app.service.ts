/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getUser(userId: number): number {
    return userId;
  }
}
