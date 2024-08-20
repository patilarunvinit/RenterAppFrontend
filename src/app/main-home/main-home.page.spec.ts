import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainHomePage } from './main-home.page';

describe('MainHomePage', () => {
  let component: MainHomePage;
  let fixture: ComponentFixture<MainHomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MainHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
