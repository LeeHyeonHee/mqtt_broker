import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class SchedulerService {
  // @Cron('* * * * * *', { name: 'RNGTask' })
  handleCron() {
    console.log(String(Math.floor(Math.random() * 100000)).padStart(1024, '0'));
  }
}
