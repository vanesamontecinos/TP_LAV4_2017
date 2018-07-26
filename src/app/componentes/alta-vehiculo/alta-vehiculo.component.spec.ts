import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaVehiculoComponent } from './alta-vehiculo.component';

describe('AltaVehiculoComponent', () => {
  let component: AltaVehiculoComponent;
  let fixture: ComponentFixture<AltaVehiculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaVehiculoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
