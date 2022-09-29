import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('MQTT_SERVICE') private client: ClientProxy) {}

  @Get('notifications')
  getNotifications(@Query('User') user: string) {
    const userData = user || '1';
    const powerNumber = 10 ** 16;

    [...new Array(64)].map((_, idx) => {
      let randomNumber = String(Math.floor(Math.random() * powerNumber)).padEnd(
        32,
        '0',
      );
      randomNumber = userData === '1' ? randomNumber : 'ddd';
      const topic = 'notification_channel';
      this.client.emit(`${topic}${idx}`, {
        device: idx,
        topic: topic + idx,
        data: randomNumber,
      });
    });
    return 1;
  }

  @Get('dmddo')
  getDmddo() {
    const dmddoTopic = 'dmddo';
    const dmddoMsg = this.client.send(dmddoTopic, {
      topic: dmddoTopic,
      data: 'dmddo!!',
    });
    return dmddoMsg;
  }
}
