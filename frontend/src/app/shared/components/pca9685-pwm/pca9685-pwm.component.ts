import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pca9685PwmDto } from '../../dtos/pca9685-pwm.dto';
import { Pca9685ApiService } from '../../../api/pca9685-api.service';

@Component({
  selector: 'app-pca9685-pwm',
  templateUrl: './pca9685-pwm.component.html',
  styleUrls: ['./pca9685-pwm.component.scss'],
})
export class Pca9685PwmComponent {
  public state = new Pca9685PwmDto();
  public disable = true;
  @Input() caption = '';
  @Input() pwm!: number;
  private subscription: Subscription | undefined;

  constructor(private pca9685Api: Pca9685ApiService) {}

  public ngOnInit() {
    const state = this.pca9685Api.onPwmUpdate(this.pwm);
    this.subscription = state.subscribe((data) => {
      const newValue = data as Pca9685PwmDto;
      this.state = newValue;
      this.disable = false;
    });

    this.pca9685Api.triggerPwmUpdate(this.pwm);
  }

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public onSave() {
    this.disable = true;
    this.pca9685Api.setPwm(this.state);
  }
}
