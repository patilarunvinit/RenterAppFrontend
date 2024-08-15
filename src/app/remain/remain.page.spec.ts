import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemainPage } from './remain.page';

describe('RemainPage', () => {
  let component: RemainPage;
  let fixture: ComponentFixture<RemainPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RemainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
