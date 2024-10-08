import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreativeComponent } from './creative.component';

describe('CreativeComponent', () => {
  let component: CreativeComponent;
  let fixture: ComponentFixture<CreativeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreativeComponent]
    });
    fixture = TestBed.createComponent(CreativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
