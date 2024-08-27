import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CpasswordPage } from './cpassword.page';

describe('CpasswordPage', () => {
  let component: CpasswordPage;
  let fixture: ComponentFixture<CpasswordPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CpasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
