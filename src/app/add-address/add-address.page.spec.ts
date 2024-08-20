import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddAddressPage } from './add-address.page';

describe('AddAddressPage', () => {
  let component: AddAddressPage;
  let fixture: ComponentFixture<AddAddressPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
