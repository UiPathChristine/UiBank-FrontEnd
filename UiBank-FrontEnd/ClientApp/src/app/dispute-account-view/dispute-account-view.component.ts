import { Component, OnInit } from '@angular/core';
import { Local } from 'protractor/built/driverProviders';
import { AccountsService } from '../accounts/accounts.service';
import { Transaction } from '../shared/transaction';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dispute-account-view',
  templateUrl: './dispute-account-view.component.html',
  styleUrls: ['./dispute-account-view.component.css']
})
export class DisputeAccountViewComponent implements OnInit {
  public accountId: string;
  public amounts: string[];
  public descriptions: string[];
  public transactions: Transaction[];
  public disputedAmounts: string[];
  public disputedDescriptions: string[];
  public disputedTransactions: Transaction[];
  public resolvedAmounts: string[];
  public resolvedDescriptions: string[];
  public resolvedTransactions: Transaction[];
  public sub: any;
  public transactionsToBeDisputed: Transaction[];
  

  constructor(private accountService: AccountsService, private route: ActivatedRoute, private _location: Location) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.accountId = params['accountId'];
    });

    this.accountService.getDisputedTransactions(this.accountId)
      .subscribe((transactions: Transaction[]) => {
        this.disputedTransactions = transactions;
        this.disputedAmounts = transactions.map(a => a.amount.toString());
        this.disputedDescriptions = transactions.map(a => a.description);
        console.log(this.disputedAmounts.length)
      });

    this.accountService.getTransactions(this.accountId)
      .subscribe((transactions: Transaction[]) => {
        this.transactions = transactions;
        this.transactions = this.transactions.filter(a => a.dispute === "ok");
        this.amounts = transactions.map(a => a.amount.toString());
        this.descriptions = transactions.map(a => a.description);
        console.log(this.amounts.length)
      });

    this.accountService.getResolvedTransactions(this.accountId)
      .subscribe((transactions: Transaction[]) => {
        this.resolvedTransactions = transactions;
        this.resolvedAmounts = transactions.map(a => a.amount.toString());
        this.resolvedDescriptions = transactions.map(a => a.description);
        console.log(this.amounts.length)
      });
  }

  backButton() {
    this._location.back();
  }

  disputeTransactions() {
    this.transactionsToBeDisputed = this.transactions.filter(a => a.selectedForDispute === true);

    this.transactionsToBeDisputed.forEach(obj => {

        const transactionTemp = obj;
        transactionTemp.dispute = "reported";

        this.accountService.disputeTransaction(transactionTemp).subscribe((transaction: Transaction) => {
          console.log(transaction);
      });;
    })

    window.location.reload();
  }

}
