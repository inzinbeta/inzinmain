import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerloginPageComponent } from './dealerlogin-page.component';

describe('DealerloginPageComponent', () => {
  let component: DealerloginPageComponent;
  let fixture: ComponentFixture<DealerloginPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerloginPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerloginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
