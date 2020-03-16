import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpReceivedComponent } from './help-received.component';

describe('HelpReceivedComponent', () => {
  let component: HelpReceivedComponent;
  let fixture: ComponentFixture<HelpReceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpReceivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
