import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoanService } from '../loans/loan.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  public sub: any;
  public accountID: string;
  public validAccount: boolean;
  public transactions = [
    {
      accountId: '1111',
      balance: 100.12,
      TranfertoAccountId: '1221',
      amount: 312.24,
      description: 'HOMEDEPOTSTORE 0012 22229292',
      ref: 'no idea',
      dispute: 'false',
      type: 'checking'
    },
    {
      accountId: '1111',
      balance: 120.12,
      TranfertoAccountId: '1221',
      amount: 12.00,
      description: 'HOMEDEPOTSTORE 0012 222234292',
      ref: 'no idea',
      dispute: 'false',
      type: 'checking'
    }
  ]
  


  constructor(private _location: Location, private route: ActivatedRoute, private loanService: LoanService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.accountID = params['accountID'];

    });
  }

}
