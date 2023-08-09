import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsicometricoComponent } from './psicometrico.component';

describe('PsicometricoComponent', () => {
  let component: PsicometricoComponent;
  let fixture: ComponentFixture<PsicometricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsicometricoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PsicometricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
