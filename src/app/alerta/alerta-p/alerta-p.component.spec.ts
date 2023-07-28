import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaPComponent } from './alerta-p.component';

describe('AlertaPComponent', () => {
  let component: AlertaPComponent;
  let fixture: ComponentFixture<AlertaPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertaPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertaPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
