import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderProductosComponent } from './slider-productos.component';

describe('SliderProductosComponent', () => {
  let component: SliderProductosComponent;
  let fixture: ComponentFixture<SliderProductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderProductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
