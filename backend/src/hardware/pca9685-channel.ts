import { CBinding } from './c-binding.class';

export class Pca9685Channel {
  private readonly i2cBus: number;
  private readonly i2cDeviceAddress: number;
  private readonly channelIndex: number;
  private readonly offsetLedOnLow: number;
  private readonly offsetLedOnHigh: number;
  private readonly offsetLedOffLow: number;
  private readonly offsetLedOffHigh: number;
  private pulseMaxWidth = 4095;
  private pulseOffset = 0;
  private onLow = 0;
  private onHigh = 0;
  private offLow = 0;
  private offHigh = 0;

  constructor(i2cBus: number, i2cDeviceAddress: number, channelIndex: number) {
    this.i2cBus = i2cBus;
    this.i2cDeviceAddress = i2cDeviceAddress;
    this.channelIndex = channelIndex;

    const offset = Pca9685Channel.getChannelOffset(channelIndex);

    this.offsetLedOnLow = 0x06 + offset;
    this.offsetLedOnHigh = 0x07 + offset;
    this.offsetLedOffLow = 0x08 + offset;
    this.offsetLedOffHigh = 0x09 + offset;

    this.updateOn();
    this.updateOff();
  }

  private static getChannelOffset(channel: number): number {
    if (channel > 15) {
      return 15 * 4;
    }

    if (channel < 0) {
      return 0;
    }

    return channel * 4;
  }

  public setLedOn(value: number) {
    const lower = value & 0x00ff;
    const upper = (value & 0x0f00) >> 8;
    this.i2cWriteByte(this.offsetLedOnLow, lower, this.onLow);
    this.i2cWriteByte(this.offsetLedOnHigh, upper, this.onHigh);
    console.log('[PCA9685 ' + this.i2cDeviceAddress + '] channel ' + this.channelIndex + ' set on to ' + value);
  }

  public setLedOff(value: number) {
    const lower = value & 0x00ff;
    const upper = (value & 0x0f00) >> 8;
    this.i2cWriteByte(this.offsetLedOffLow, lower, this.offLow);
    this.i2cWriteByte(this.offsetLedOffHigh, upper, this.offHigh);
    console.log('[PCA9685 ' + this.i2cDeviceAddress + '] channel ' + this.channelIndex + ' set off to ' + value);
  }

  public getLedOn(): number {
    this.updateOn();
    return (this.onLow & 0xff) | ((this.onHigh & 0xff) << 8);
  }

  public getLedOff(): number {
    this.updateOff();
    return (this.offLow & 0xff) | ((this.offHigh & 0xff) << 8);
  }

  public setDutyCycle(dutyCycle: number, maxPulseWidth = 4095, pulseOffset = 0) {
    if (dutyCycle > 100) {
      dutyCycle = 100;
    }

    if (maxPulseWidth > 4095) {
      maxPulseWidth = 4095;
    }

    if (pulseOffset > maxPulseWidth) {
      pulseOffset = 4095 - maxPulseWidth;
    }

    this.pulseMaxWidth = maxPulseWidth;
    this.pulseOffset = pulseOffset;

    let on = 0;
    let off = 0;

    if (dutyCycle != 0) {
      on = 1;
      off = Math.round((this.pulseMaxWidth * dutyCycle) / 100) - 1;
    }

    on += this.pulseOffset;
    off += this.pulseOffset;

    this.setLedOn(on);
    this.setLedOff(off);
  }

  public getDutyCycle(): number {
    const on = this.getLedOn();
    const off = this.getLedOff();

    let onPulseWidth;
    if (on > off) {
      onPulseWidth = this.pulseMaxWidth - (on - off);
    } else {
      onPulseWidth = off - on;
    }

    return Math.round((onPulseWidth * 100) / this.pulseMaxWidth);
  }

  private updateOn() {
    this.onLow = this.i2cReadByte(this.offsetLedOnLow);
    this.onHigh = this.i2cReadByte(this.offsetLedOnHigh);
  }

  private updateOff() {
    this.offLow = this.i2cReadByte(this.offsetLedOffLow);
    this.offHigh = this.i2cReadByte(this.offsetLedOffHigh);
  }

  private i2cWriteByte(register: number, value: number, current: number) {
    if (value != current) {
      CBinding.i2c_write_byte(this.i2cBus, this.i2cDeviceAddress, register, value);
    }
  }

  private i2cReadByte(register: number): number {
    return CBinding.i2c_read_byte(this.i2cBus, this.i2cDeviceAddress, register);
  }
}
