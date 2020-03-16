import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferResultComponent } from './transfer-result.component';

describe('TransferResultComponent', () => {
  let component: TransferResultComponent;
  let fixture: ComponentFixture<TransferResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
