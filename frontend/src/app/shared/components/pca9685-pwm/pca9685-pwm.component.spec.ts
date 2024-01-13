import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pca9685PwmComponent } from './pca9685-pwm.component';

describe('Pca9685PwmComponent', () => {
  let component: Pca9685PwmComponent;
  let fixture: ComponentFixture<Pca9685PwmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pca9685PwmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pca9685PwmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
