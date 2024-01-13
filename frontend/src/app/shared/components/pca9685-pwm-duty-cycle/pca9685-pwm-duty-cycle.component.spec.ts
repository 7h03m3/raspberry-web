import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pca9685PwmDutyCycleComponent } from './pca9685-pwm-duty-cycle.component';

describe('Pca9685PwmDutyCycleComponent', () => {
  let component: Pca9685PwmDutyCycleComponent;
  let fixture: ComponentFixture<Pca9685PwmDutyCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pca9685PwmDutyCycleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pca9685PwmDutyCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
