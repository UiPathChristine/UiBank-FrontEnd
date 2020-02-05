import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountApplyComponent } from './account-apply.component';

describe('AccountApplyComponent', () => {
  let component: AccountApplyComponent;
  let fixture: ComponentFixture<AccountApplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountApplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
