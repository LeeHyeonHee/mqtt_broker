import { ClientProxy } from '@nestjs/microservices';
import { Cron } from '@nestjs/schedule';
import { Controller, Inject, Injectable } from '@nestjs/common';

export class AppService {
  constructor(@Inject('MQTT_SERVICE') private client: ClientProxy) {}

  @Cron('* * * * * *', { name: 'RNGTask' })
  getNotificationsAlarm() {
    const powerNumber = 10 ** 16;
    [...new Array(64)].map((_, idx) => {
      const randomNumber = String(
        Math.floor(Math.random() * powerNumber),
      ).padEnd(32, '0');
      const topic = 'notification_channel';
      this.client.emit(`${topic}${idx}`, {
        device: idx,
        topic: topic + idx,
        data: randomNumber,
      });
    });
    return 1;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
