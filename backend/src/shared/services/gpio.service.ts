import { Gpio } from '../../hardware/gpio.class';

export class GpioService {
  private configuredGPIOs: Gpio[];
  private readonly dcMotorForward = 23;
  private readonly dcMotorBackward = 32;

  constructor() {
    this.configuredGPIOs = new Array<Gpio>();

    const GPIONumbers = [this.dcMotorForward, this.dcMotorBackward];

    GPIONumbers.forEach((gpioNumber) => {
      const gpio = new Gpio(gpioNumber);
      gpio.open();
      this.configuredGPIOs.push(gpio);
    });
  }

  public getDcMotorForward(): Gpio | undefined {
    return this.getGpio(this.dcMotorForward);
  }

  public getDcMotorBackward(): Gpio | undefined {
    return this.getGpio(this.dcMotorBackward);
  }

  public getGpioList(): number[] {
    const gpioList = new Array<number>();

    this.configuredGPIOs.forEach((entry) => {
      gpioList.push(entry.getNumber());
    });
    return gpioList;
  }

  private getGpio(number: number): Gpio | undefined {
    return this.configuredGPIOs.find((value) => {
      return value.getNumber() == number;
    });
  }
}
