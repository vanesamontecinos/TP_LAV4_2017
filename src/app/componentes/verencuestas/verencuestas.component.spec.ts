import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerencuestasComponent } from './verencuestas.component';

describe('VerencuestasComponent', () => {
  let component: VerencuestasComponent;
  let fixture: ComponentFixture<VerencuestasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerencuestasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerencuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
