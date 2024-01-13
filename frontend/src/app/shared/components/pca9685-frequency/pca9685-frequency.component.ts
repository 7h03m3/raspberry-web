import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pca9685ApiService } from '../../../api/pca9685-api.service';

@Component({
  selector: 'app-pca9685-frequency',
  templateUrl: './pca9685-frequency.component.html',
  styleUrls: ['./pca9685-frequency.component.scss'],
})
export class Pca9685FrequencyComponent {
  @Input() caption = '';
  public disabled = true;
  public frequency = 0;
  private subscription: Subscription | undefined;

  constructor(private pca9685Api: Pca9685ApiService) {}

  public ngOnInit() {
    this.pca9685Api.onFrequencyUpdate().subscribe((data) => {
      this.frequency = parseFloat(data.toFixed(2));
      this.disabled = false;
    });

    this.pca9685Api.triggerFrequencyUpdate();
  }

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public onSave() {
    this.pca9685Api.setFrequency(this.frequency);
  }
}
