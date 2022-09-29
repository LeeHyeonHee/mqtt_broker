import { ClientProxy } from '@nestjs/microservices';
import { Cron } from '@nestjs/schedule';
import { Controller, Inject, Injectable } from '@nestjs/common';

@Injectable()
@Controller()
export class AppService {
  constructor(@Inject('MQTT_SERVICE') private client: ClientProxy) {}
  getNotificationsAlarm() {
    const randomNumber = String(Math.floor(Math.random() * 100000)).padStart(
      1024,
      '0',
    );
    const msg = this.client.send('notification_channel', randomNumber);

    return msg;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
