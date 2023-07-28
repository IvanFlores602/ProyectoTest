import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestpsicometricoComponent } from './testpsicometrico.component';

describe('TestpsicometricoComponent', () => {
  let component: TestpsicometricoComponent;
  let fixture: ComponentFixture<TestpsicometricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestpsicometricoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestpsicometricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
