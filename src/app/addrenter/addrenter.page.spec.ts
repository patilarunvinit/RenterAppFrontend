import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddrenterPage } from './addrenter.page';

describe('AddrenterPage', () => {
  let component: AddrenterPage;
  let fixture: ComponentFixture<AddrenterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrenterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
