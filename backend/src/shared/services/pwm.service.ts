import { Injectable } from '@nestjs/common';
import { Pca9685 } from '../../hardware/pca9685.class';
import { Pca9685Channel } from '../../hardware/pca9685-channel';

@Injectable()
export class PwmService {
  private pca9685: Pca9685;
  private readonly dcMotorChannel = 0;

  constructor() {
    this.pca9685 = new Pca9685(1, 0x40);
    this.pca9685.setFrequency(50);
  }

  public setFrequency(frequency: number) {
    this.pca9685.setFrequency(frequency);
  }

  public getFrequency(): number {
    return this.pca9685.getFrequency();
  }

  public getDcMotor(): Pca9685Channel | undefined {
    return this.pca9685.getChannel(this.dcMotorChannel);
  }

  public getMode1(): number {
    return this.pca9685.getMode1();
  }

  public getMode2(): number {
    return this.pca9685.getMode2();
  }

  public setMode1(value: number) {
    this.pca9685.setMode1(value);
  }

  public setMode2(value: number) {
    this.pca9685.setMode2(value);
  }
}
