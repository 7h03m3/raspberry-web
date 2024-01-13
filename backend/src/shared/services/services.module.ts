import { Module } from '@nestjs/common';
import { GpioService } from './gpio.service';
import { PwmService } from './pwm.service';

@Module({
  imports: [],
  controllers: [],
  providers: [GpioService, PwmService],
  exports: [GpioService, PwmService],
})
export class ServicesModule {}
