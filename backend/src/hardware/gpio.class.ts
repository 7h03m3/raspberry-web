import { CBinding } from './c-binding.class';

export class Gpio {
  private readonly gpioNumber: number;
  private readonly gpioDirectory: string;
  private readonly defaultValue: boolean;

  constructor(gpioNumber: number) {
    this.gpioNumber = gpioNumber;
    this.gpioDirectory = '/sys/class/gpio/gpio' + this.gpioNumber;
  }

  public open() {
    if (CBinding.doesFileExist(this.gpioDirectory + '/value')) {
      this.close();
    }

    CBinding.writeFile('/sys/class/gpio/export', this.gpioNumber.toString());
    CBinding.writeFile(this.gpioDirectory + '/direction', 'out');
  }

  public close() {
    CBinding.writeFile('/sys/class/gpio/unexport', this.gpioNumber.toString());
  }

  public set(value: boolean) {
    const valueNumber: number = value == true ? 1 : 0;
    CBinding.writeFile(this.gpioDirectory + '/value', valueNumber.toString());

    console.log('[GPIO' + this.gpioNumber + '] set to ' + valueNumber);
  }

  public get(): boolean {
    const stringValue = CBinding.readFile(this.gpioDirectory + '/value').toString();
    return stringValue.includes('1');
  }

  public getNumber(): number {
    return this.gpioNumber;
  }
}
