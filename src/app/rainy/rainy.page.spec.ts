import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RainyPage } from './rainy.page';

describe('RainyPage', () => {
  let component: RainyPage;
  let fixture: ComponentFixture<RainyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RainyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
