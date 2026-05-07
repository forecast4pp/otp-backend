import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StormyPage } from './stormy.page';

describe('StormyPage', () => {
  let component: StormyPage;
  let fixture: ComponentFixture<StormyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StormyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
