import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaVIajeComponent } from './alta-viaje.component';

describe('AltaVIajeComponent', () => {
  let component: AltaVIajeComponent;
  let fixture: ComponentFixture<AltaVIajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaVIajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaVIajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
