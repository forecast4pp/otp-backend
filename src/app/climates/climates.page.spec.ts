import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClimatesPage } from './climates.page';

describe('ClimatesPage', () => {
  let component: ClimatesPage;
  let fixture: ComponentFixture<ClimatesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClimatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
