import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdashboardPagesComponent } from './userdashboard-pages.component';

describe('UserdashboardPagesComponent', () => {
  let component: UserdashboardPagesComponent;
  let fixture: ComponentFixture<UserdashboardPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserdashboardPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdashboardPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
