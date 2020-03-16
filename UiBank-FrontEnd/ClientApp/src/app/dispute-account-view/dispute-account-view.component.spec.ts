import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisputeAccountViewComponent } from './dispute-account-view.component';

describe('DisputeAccountViewComponent', () => {
  let component: DisputeAccountViewComponent;
  let fixture: ComponentFixture<DisputeAccountViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisputeAccountViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisputeAccountViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
