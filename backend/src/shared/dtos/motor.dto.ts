import { MotorState } from '../enums/motor-state.enum';

export class MotorDto {
  state: MotorState;
  dutyCycle: number;
  frequency: number;

  constructor() {
    this.dutyCycle = 0;
    this.state = MotorState.Stop;
    this.frequency = 0;
  }
}
