import { CBinding } from './c-binding.class';
import { Pca9685Channel } from './pca9685-channel';

export class Pca9685 {
  public static ChannelCount = 16;
  private readonly oscFrequency = 25000000;
  private readonly i2cBus: number;
  private readonly i2cDeviceAddress: number;
  private channels = new Array<Pca9685Channel>();
  private frequency = 0;

  constructor(i2cBus: number, i2cDeviceAddress: number) {
    this.i2cBus = i2cBus;
    this.i2cDeviceAddress = i2cDeviceAddress;

    this.updateFrequency();

    for (let i = 0; i < Pca9685.ChannelCount; i++) {
      const channel = new Pca9685Channel(this.i2cBus, this.i2cDeviceAddress, i);
      this.channels[i] = channel;
    }
  }

  public setFrequency(frequency: number) {
    const value = this.getFrequencyRegisterValue(frequency);

    if (frequency != this.frequency) {
      this.setMode1(0x10); // sleep
      this.i2cWriteByte(0xfe, value);
      this.setMode1(0x80); // restart

      console.log(
        '[PCA9685 ' + this.i2cDeviceAddress + '] set frequency to ' + this.getFrequencyFromRegister(value) + ' Hz',
      );

      this.frequency = this.getFrequency();
    }
  }

  public getFrequency(): number {
    this.updateFrequency();
    return this.frequency;
  }

  public getMode1(): number {
    return this.i2cReadByte(0x00);
  }

  public getMode2(): number {
    return this.i2cReadByte(0x01);
  }

  public setMode1(value: number) {
    this.i2cWriteByte(0x00, value);
  }

  public setMode2(value: number) {
    this.i2cWriteByte(0x01, value);
  }

  public getChannel(channel: number): Pca9685Channel | undefined {
    return this.channels[channel];
  }

  private updateFrequency() {
    const value = this.i2cReadByte(0xfe);
    this.frequency = this.getFrequencyFromRegister(value);
  }

  private getFrequencyFromRegister(register: number): number {
    const value = this.oscFrequency / ((register + 1) * 4096);
    return parseFloat(value.toFixed(2));
  }

  private getFrequencyRegisterValue(frequency: number): number {
    let value = Math.round(this.oscFrequency / (4096 * frequency) - 1);

    if (value > 0xff) {
      value = 0xff;
    } else if (value < 0x03) {
      value = 0x01;
    }

    return value;
  }

  private i2cWriteByte(register: number, value: number) {
    CBinding.i2c_write_byte(this.i2cBus, this.i2cDeviceAddress, register, value);
  }

  private i2cReadByte(register: number): number {
    return CBinding.i2c_read_byte(this.i2cBus, this.i2cDeviceAddress, register);
  }
}
