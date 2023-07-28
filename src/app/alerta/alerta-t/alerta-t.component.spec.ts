import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaTComponent } from './alerta-t.component';

describe('AlertaTComponent', () => {
  let component: AlertaTComponent;
  let fixture: ComponentFixture<AlertaTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertaTComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertaTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
