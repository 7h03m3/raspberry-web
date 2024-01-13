import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcMotorComponent } from './dc-motor.component';

describe('DcMotorComponent', () => {
  let component: DcMotorComponent;
  let fixture: ComponentFixture<DcMotorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcMotorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DcMotorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
