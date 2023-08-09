import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarPComponent } from './buscar-p.component';

describe('BuscarPComponent', () => {
  let component: BuscarPComponent;
  let fixture: ComponentFixture<BuscarPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
