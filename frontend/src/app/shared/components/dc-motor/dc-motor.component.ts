import { Component } from '@angular/core';
import { MotorApiService } from '../../../api/motor-api.service';
import { MotorDto } from '../../dtos/motor.dto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dc-motor',
  templateUrl: './dc-motor.component.html',
  styleUrls: ['./dc-motor.component.scss'],
})
export class DcMotorComponent {
  public motorState = new MotorDto();
  public disabled = true;
  private subscription = new Subscription();

  constructor(private motorApi: MotorApiService) {}

  public ngOnInit() {
    const state = this.motorApi.onUpdate();
    this.subscription = state.subscribe((data) => {
      this.motorState = data;
      this.disabled = false;
    });

    this.motorApi.getState();
  }

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public onChange() {
    this.disabled = true;
    this.motorApi.setState(this.motorState);
  }

  public isSelected(state: string): boolean {
    return this.motorState.state == state;
  }
}
