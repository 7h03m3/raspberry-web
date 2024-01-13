export class GpioDto {
  number: number;
  state: boolean;

  constructor() {
    this.number = 0;
    this.state = false;
  }
}
