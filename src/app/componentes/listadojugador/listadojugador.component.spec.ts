import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadojugadorComponent } from './listadojugador.component';

describe('ListadojugadorComponent', () => {
  let component: ListadojugadorComponent;
  let fixture: ComponentFixture<ListadojugadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadojugadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadojugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
