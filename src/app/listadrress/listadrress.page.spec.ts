import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadrressPage } from './listadrress.page';

describe('ListadrressPage', () => {
  let component: ListadrressPage;
  let fixture: ComponentFixture<ListadrressPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadrressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
