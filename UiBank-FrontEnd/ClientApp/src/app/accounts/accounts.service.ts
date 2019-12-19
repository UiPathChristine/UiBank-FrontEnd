import { Injectable } from '@angular/core';
import { Account } from '../shared/account';
import { ACCOUNTS } from '../shared/mock-account';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor() { }

  getAccounts(): Account[] {
    return ACCOUNTS;
  }
}
