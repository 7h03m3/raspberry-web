export class Pca9685PwmDto {
  pwmNumber: number;
  on: number;
  off: number;

  constructor() {
    this.pwmNumber = 0;
    this.on = 0;
    this.off = 0;
  }
}
