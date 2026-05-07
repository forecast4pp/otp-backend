import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SunnyPage } from './sunny.page';

describe('SunnyPage', () => {
  let component: SunnyPage;
  let fixture: ComponentFixture<SunnyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SunnyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
