import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManagerentPage } from './managerent.page';

describe('ManagerentPage', () => {
  let component: ManagerentPage;
  let fixture: ComponentFixture<ManagerentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
