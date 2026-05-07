import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CloudyPage } from './cloudy.page';

describe('CloudyPage', () => {
  let component: CloudyPage;
  let fixture: ComponentFixture<CloudyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
