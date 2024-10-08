import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovativeComponent } from './innovative.component';

describe('InnovativeComponent', () => {
  let component: InnovativeComponent;
  let fixture: ComponentFixture<InnovativeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InnovativeComponent]
    });
    fixture = TestBed.createComponent(InnovativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
