import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts/accounts.service';

import { Account } from "../shared/account";
import { NgForm } from '@angular/forms';

import { Location } from '@angular/common';
import { TransferData } from '../shared/transfer-data';
import { TransferMoneyService } from './transfer-money.service';
import { TransferObject } from '../shared/TransferObject';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.css']
})
export class TransferMoneyComponent implements OnInit {
  fromAccount: Account = new Account();
  toAccount: Account = new Account();
  amountTransferred: number;
  currentAccounts: Account[];
  transferData: TransferData;
  test: string;
  response: string;
  constructor(private route: Router, private _location: Location, private accountService: AccountsService, private transferService: TransferMoneyService) { }

  ngOnInit() {
    this.accountService.getAccounts()
      .subscribe(accounts =>
        this.currentAccounts = accounts
      );
  }

  setTransferFormFields(form: NgForm) {
    console.log(form.value);
    this.transferData = form.value;

    this.amountTransferred = Number(this.transferData.transferAmount);
  }

  submitTransfer() {
    const transferObject: TransferObject = {
      type: 'transfer',
      dispute: 'ok',
      ref: '',
      description: 'transfer was made for demo purposes',
      amount: this.amountTransferred,
      TransfertoAccountId: this.toAccount.id,
      balance: this.toAccount.balance,
      accountId: this.fromAccount.id
    }

    this.transferService.transferMoney(transferObject).subscribe(reply => {
      this.response = reply;
      console.log(this.response);

      this.route.navigate(['transfer-result']);


    });
  }

  backButton() {
    this._location.back();
  }

  setFields() {
    console.log(this.fromAccount.balance)
    console.log(this.toAccount.balance)
    console.log(this.amountTransferred)
  }



}
