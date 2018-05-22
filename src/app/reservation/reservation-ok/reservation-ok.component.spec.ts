import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationOkComponent } from './reservation-ok.component';

describe('ReservationOkComponent', () => {
  let component: ReservationOkComponent;
  let fixture: ComponentFixture<ReservationOkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationOkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
