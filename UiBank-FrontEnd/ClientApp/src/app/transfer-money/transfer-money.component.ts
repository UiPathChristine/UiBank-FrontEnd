import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts/accounts.service';

import { Account } from "../shared/account";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.css']
})
export class TransferMoneyComponent implements OnInit {
  fromAccount: string;
  toAccount: string;
  amountTransferred: number;
  currentAccounts: Account[];

  constructor(private accountService: AccountsService) { }

  ngOnInit() {
    this.accountService.getAccounts()
      .subscribe(accounts =>
        this.currentAccounts = accounts
      );
  }

  setFields() {
    
  }

  setTransferFormFields(form: NgForm) {
    console.log("setting fields");
  }
}
