import { Component, Input } from '@angular/core';
import { Pca9685PwmDto } from '../../dtos/pca9685-pwm.dto';
import { Subscription } from 'rxjs';
import { Pca9685ApiService } from '../../../api/pca9685-api.service';

@Component({
  selector: 'app-pca9685-pwm-duty-cycle',
  templateUrl: './pca9685-pwm-duty-cycle.component.html',
  styleUrls: ['./pca9685-pwm-duty-cycle.component.scss'],
})
export class Pca9685PwmDutyCycleComponent {
  public dutyCycle = 0;
  public disable = true;
  @Input() caption = '';
  @Input() pwm!: number;
  @Input() maxPulse = 4095;
  @Input() offsetPulse = 0;
  private subscription: Subscription | undefined;

  constructor(private pca9685Api: Pca9685ApiService) {}

  public ngOnInit() {
    const state = this.pca9685Api.onPwmUpdate(this.pwm);
    this.subscription = state.subscribe((data) => {
      const newValue = data as Pca9685PwmDto;
      this.dutyCycle = this.getDutyCycle(newValue);
      this.disable = false;
    });

    this.pca9685Api.triggerPwmUpdate(this.pwm);
  }

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public onChange() {
    const settings = new Pca9685PwmDto();
    settings.pwmNumber = this.pwm;

    if (this.dutyCycle != 0) {
      settings.on = 1;
      settings.off = Math.round((this.maxPulse * this.dutyCycle) / 100) - 1;
    }

    settings.on += this.offsetPulse;
    settings.off += this.offsetPulse;

    this.pca9685Api.setPwm(settings);
  }

  private getDutyCycle(state: Pca9685PwmDto): number {
    let onPulseWidth = 0;
    if (state.on > state.off) {
      onPulseWidth = this.maxPulse - (state.on - state.off);
    } else {
      onPulseWidth = state.off - state.on;
    }

    return Math.round((onPulseWidth * 100) / this.maxPulse);
  }
}
