import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisputeTransactionComponent } from './dispute-transaction.component';

describe('DisputeTransactionComponent', () => {
  let component: DisputeTransactionComponent;
  let fixture: ComponentFixture<DisputeTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisputeTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisputeTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
