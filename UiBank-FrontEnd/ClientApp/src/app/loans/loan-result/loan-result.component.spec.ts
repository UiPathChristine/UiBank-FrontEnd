import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanResultComponent } from './loan-result.component';

describe('LoanResultComponent', () => {
  let component: LoanResultComponent;
  let fixture: ComponentFixture<LoanResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
