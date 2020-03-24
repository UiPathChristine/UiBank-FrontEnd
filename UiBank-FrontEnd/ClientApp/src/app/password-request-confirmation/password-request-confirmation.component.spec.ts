import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRequestConfirmationComponent } from './password-request-confirmation.component';

describe('PasswordRequestConfirmationComponent', () => {
  let component: PasswordRequestConfirmationComponent;
  let fixture: ComponentFixture<PasswordRequestConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordRequestConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordRequestConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
