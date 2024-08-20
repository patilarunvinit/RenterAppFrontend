import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SigleaddressPage } from './sigleaddress.page';

describe('SigleaddressPage', () => {
  let component: SigleaddressPage;
  let fixture: ComponentFixture<SigleaddressPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SigleaddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
