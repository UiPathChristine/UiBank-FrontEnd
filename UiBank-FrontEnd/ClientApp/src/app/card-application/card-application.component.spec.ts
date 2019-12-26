import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardApplicationComponent } from './card-application.component';

describe('CardApplicationComponent', () => {
  let component: CardApplicationComponent;
  let fixture: ComponentFixture<CardApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
