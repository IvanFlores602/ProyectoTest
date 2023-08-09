import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPsicometricoComponent } from './test-psicometrico.component';

describe('TestPsicometricoComponent', () => {
  let component: TestPsicometricoComponent;
  let fixture: ComponentFixture<TestPsicometricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestPsicometricoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestPsicometricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
