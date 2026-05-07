import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SickinfoPage } from './sickinfo.page';

describe('SickinfoPage', () => {
  let component: SickinfoPage;
  let fixture: ComponentFixture<SickinfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SickinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
