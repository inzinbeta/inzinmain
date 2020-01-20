import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteloginPageComponent } from './websitelogin-page.component';

describe('WebsiteloginPageComponent', () => {
  let component: WebsiteloginPageComponent;
  let fixture: ComponentFixture<WebsiteloginPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteloginPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteloginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
