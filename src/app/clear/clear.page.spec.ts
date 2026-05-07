import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClearPage } from './clear.page';

describe('ClearPage', () => {
  let component: ClearPage;
  let fixture: ComponentFixture<ClearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
