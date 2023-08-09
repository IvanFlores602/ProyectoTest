import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTecnicoComponent } from './test-tecnico.component';

describe('TestTecnicoComponent', () => {
  let component: TestTecnicoComponent;
  let fixture: ComponentFixture<TestTecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestTecnicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
