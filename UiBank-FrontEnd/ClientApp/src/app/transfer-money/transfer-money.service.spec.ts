import { TestBed } from '@angular/core/testing';

import { TransferMoneyService } from './transfer-money.service';

describe('TransferMoneyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransferMoneyService = TestBed.get(TransferMoneyService);
    expect(service).toBeTruthy();
  });
});
