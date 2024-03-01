import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieReservaComponent } from './pie-reserva.component';

describe('PieReservaComponent', () => {
  let component: PieReservaComponent;
  let fixture: ComponentFixture<PieReservaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieReservaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
