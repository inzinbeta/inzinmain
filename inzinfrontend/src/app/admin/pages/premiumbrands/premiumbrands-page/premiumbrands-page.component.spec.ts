import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumbrandsPageComponent } from './premiumbrands-page.component';

describe('PremiumbrandsPageComponent', () => {
  let component: PremiumbrandsPageComponent;
  let fixture: ComponentFixture<PremiumbrandsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiumbrandsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumbrandsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
