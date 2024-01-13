import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMotorComponent } from './main-motor.component';

describe('MainMotorComponent', () => {
  let component: MainMotorComponent;
  let fixture: ComponentFixture<MainMotorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainMotorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainMotorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
