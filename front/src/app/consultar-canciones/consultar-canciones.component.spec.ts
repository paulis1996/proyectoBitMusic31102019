import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarCancionesComponent } from './consultar-canciones.component';

describe('ConsultarCancionesComponent', () => {
  let component: ConsultarCancionesComponent;
  let fixture: ComponentFixture<ConsultarCancionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarCancionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarCancionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
