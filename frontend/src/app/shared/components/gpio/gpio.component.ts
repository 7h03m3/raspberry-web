import { Component, Input } from '@angular/core';
import { GpioApiService } from '../../../api/gpio-api.service';
import { GpioDto } from '../../dtos/gpio.dto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gpio',
  templateUrl: './gpio.component.html',
  styleUrls: ['./gpio.component.scss'],
})
export class GpioComponent {
  public state = false;
  public disabledButtons = true;
  @Input() caption = '';
  @Input() gpioNumber!: number;
  private stateSubscription: Subscription | undefined;

  constructor(private gpioApi: GpioApiService) {}

  public ngOnInit() {
    const state = this.gpioApi.onUpdate(this.gpioNumber);
    this.stateSubscription = state.subscribe((data) => {
      const newValue = data as GpioDto;
      this.state = newValue.state;
      this.disabledButtons = false;
    });

    this.gpioApi.triggerUpdate(this.gpioNumber);
  }

  public ngOnDestroy() {
    if (this.stateSubscription) {
      this.stateSubscription.unsubscribe();
    }
  }

  public onGpioSetOn() {
    this.setGpioState(true);
  }

  public onGpioSetOff() {
    this.setGpioState(false);
  }

  private setGpioState(state: boolean) {
    this.disabledButtons = true;
    this.gpioApi.set(this.gpioNumber, state);
  }
}
