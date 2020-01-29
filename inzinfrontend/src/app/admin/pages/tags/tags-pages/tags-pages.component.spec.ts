import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsPagesComponent } from './tags-pages.component';

describe('TagsPagesComponent', () => {
  let component: TagsPagesComponent;
  let fixture: ComponentFixture<TagsPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
