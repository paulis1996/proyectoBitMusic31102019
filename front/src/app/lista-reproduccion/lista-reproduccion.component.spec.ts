import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReproduccionComponent } from './lista-reproduccion.component';

describe('ListaReproduccionComponent', () => {
  let component: ListaReproduccionComponent;
  let fixture: ComponentFixture<ListaReproduccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaReproduccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaReproduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
