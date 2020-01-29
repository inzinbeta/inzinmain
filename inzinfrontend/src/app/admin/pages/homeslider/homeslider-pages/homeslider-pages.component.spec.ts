import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomesliderPagesComponent } from './homeslider-pages.component';

describe('HomesliderPagesComponent', () => {
  let component: HomesliderPagesComponent;
  let fixture: ComponentFixture<HomesliderPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomesliderPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomesliderPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
