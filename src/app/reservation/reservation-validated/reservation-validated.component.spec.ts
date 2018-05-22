import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationValidatedComponent } from './reservation-validated.component';

describe('ReservationValidatedComponent', () => {
  let component: ReservationValidatedComponent;
  let fixture: ComponentFixture<ReservationValidatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationValidatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationValidatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
