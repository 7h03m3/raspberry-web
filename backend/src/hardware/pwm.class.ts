import { CBinding } from './c-binding.class';

export class Pwm {
  private readonly microsecondFactor = 1000000000;
  private readonly defaultPeriod = 1000000000; // 1 Hz
  private readonly defaultDutyCycle = 500000000; // 50%
  private readonly minPeriod = 100;
  private readonly minDutyCycle = 0;
  private readonly pwmNumber: number;
  private readonly pwmDirectory: string;
  private isRunning = false;

  constructor(pwmNumber: number) {
    this.pwmNumber = pwmNumber;
    this.pwmDirectory = '/sys/class/pwm/pwmchip0/pwm' + this.pwmNumber;
  }

  public async open(): Promise<any> {
    if (CBinding.doesFileExist(this.pwmDirectory + '/enable')) {
      this.close();
    }

    CBinding.writeFile('/sys/class/pwm/pwmchip0/export', this.pwmNumber.toString());

    this.setPeriod(this.defaultPeriod);
    this.setDutyCycle(this.defaultDutyCycle);
    this.stop();
    this.isRunning = false;
  }

  public close() {
    CBinding.writeFile('/sys/class/pwm/pwmchip0/unexport', this.pwmNumber.toString());
  }

  public async start(frequency: number, dutyCycle: number, inversed: boolean): Promise<any> {
    if (dutyCycle > 100) {
      dutyCycle = 100;
    } else if (dutyCycle < 0) {
      dutyCycle = 0;
    }

    let period = (1 / frequency) * this.microsecondFactor;
    let dutyCycleTime = (period / 100) * dutyCycle;

    period = Math.round(period);
    dutyCycleTime = Math.round(dutyCycleTime);

    if (this.isRunning) {
      this.stop();
    }

    this.setPeriod(period);
    this.setDutyCycle(dutyCycleTime);
    this.setPolarity(inversed);
    this.enable();

    this.isRunning = true;
  }

  public stop() {
    this.disable();
    this.setDutyCycle(this.minDutyCycle);
    this.setPeriod(this.minPeriod);
    this.setPolarity(false);

    this.isRunning = false;
  }

  private disable() {
    this.setEnable('0');
  }

  private enable() {
    this.setEnable('1');
  }

  private setPolarity(inversed: boolean) {
    const value = inversed == false ? 'normal' : 'inversed';
    CBinding.writeFile(this.pwmDirectory + '/polarity', value);
  }

  private setEnable(value: string) {
    CBinding.writeFile(this.pwmDirectory + '/enable', value);
  }

  private setPeriod(value: number) {
    CBinding.writeFile(this.pwmDirectory + '/period', value.toString());
  }

  private setDutyCycle(value: number) {
    CBinding.writeFile(this.pwmDirectory + '/duty_cycle', value.toString());
  }
}
