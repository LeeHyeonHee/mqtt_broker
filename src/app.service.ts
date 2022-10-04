import { ClientProxy } from '@nestjs/microservices';
import { Cron } from '@nestjs/schedule';
import { Controller, Inject, Injectable } from '@nestjs/common';

export class AppService {
  constructor(@Inject('MQTT_SERVICE') private client: ClientProxy) {}

  @Cron('* * * * * *', { name: 'RNGTask' })
  getNotificationsAlarm() {
    const powerNumber = 10 ** 16;
    const time = new Date();
    time.setHours(time.getHours() + 9);
    const nowTime = time.toISOString().replace('T', ' ').substring(0, 19);
    [...new Array(64)].map((_, idx) => {
      const randomNumber = String(
        Math.floor(Math.random() * powerNumber),
      ).padEnd(32, '0');
      const topic = 'notification_channel';
      this.client.emit(`${topic}${idx}`, {
        timestamp: nowTime,
        device: idx,
        topic: topic + idx,
        data: randomNumber,
      });
    });
  }
}
