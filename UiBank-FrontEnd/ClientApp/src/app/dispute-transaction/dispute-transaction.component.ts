import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts/accounts.service';
import { Account } from "../shared/account";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dispute-transaction',
  templateUrl: './dispute-transaction.component.html',
  styleUrls: ['./dispute-transaction.component.css']
})
export class DisputeTransactionComponent implements OnInit {
  public accounts: Account[];
  public selectedAccount: Account = new Account;
  public sub: any;
  public accountId: string;
  public amounts: string[];
  public descriptions: string[];

  constructor(private accountService: AccountsService, private route: ActivatedRoute, private _location: Location) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.accountId = params['accountId'];
    });

    this.accountService.getAccounts()
      .subscribe(accounts =>
        this.accounts = accounts
    );
  }

  checkDisputeStatus() {

  }

  backButton() {
    this._location.back();
  }

}
