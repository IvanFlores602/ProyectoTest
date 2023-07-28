import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesttecnicoComponent } from './testtecnico.component';

describe('TesttecnicoComponent', () => {
  let component: TesttecnicoComponent;
  let fixture: ComponentFixture<TesttecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesttecnicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TesttecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
