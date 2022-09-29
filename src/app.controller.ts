import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron } from '@nestjs/schedule';

@Controller()
export class AppController {
  constructor(@Inject('MQTT_SERVICE') private client: ClientProxy) {}

  @Get('notifications')
  getNotifications(@Query('User') user: string) {
    const userData = user || '1';
    let randomNumber = String(Math.floor(Math.random() * 100000000)).padStart(
      1024,
      '0',
    );
    // const powerNumber = 10 ** 100;
    // const randomNumber = String(Math.floor(Math.random() * powerNumber));
    randomNumber = userData === '1' ? randomNumber : '응애 ㅋㅋ';
    console.log('11');
    
    const topic = 'notification_channel';
    const msg = this.client.send(topic, {
      topic: topic,
      data: randomNumber,
    });
    return msg;
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
