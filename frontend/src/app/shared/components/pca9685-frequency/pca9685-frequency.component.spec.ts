import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pca9685FrequencyComponent } from './pca9685-frequency.component';

describe('Pca9685FrequencyComponent', () => {
  let component: Pca9685FrequencyComponent;
  let fixture: ComponentFixture<Pca9685FrequencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pca9685FrequencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pca9685FrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
