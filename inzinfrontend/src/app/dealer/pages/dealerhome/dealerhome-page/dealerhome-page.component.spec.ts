import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerhomePageComponent } from './dealerhome-page.component';

describe('DealerhomePageComponent', () => {
  let component: DealerhomePageComponent;
  let fixture: ComponentFixture<DealerhomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerhomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerhomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
