import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramadorComponent } from './programador.component';

describe('ProgramadorComponent', () => {
  let component: ProgramadorComponent;
  let fixture: ComponentFixture<ProgramadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
