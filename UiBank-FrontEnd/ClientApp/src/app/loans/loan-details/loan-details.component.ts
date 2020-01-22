import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Loan } from '../../shared/loan';
import { LoanService } from '../loan.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.css']
})
export class LoanDetailsComponent implements OnInit {
  public amount: number;
  public rate: number;
  public income: number;
  public quoteID: string;
  public age: number;
  public term: number
  private sub: any;
  public myLoan: Loan;
  public loadPage: string = "yo";
  public errorMessage: string;
  public validID: string = "";
  public giant: boolean = true;

  constructor(private _location: Location, private route: ActivatedRoute, private loanService: LoanService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.quoteID = params['quoteID'];

      this.loanService.getLoanInfo(this.quoteID).subscribe(reply => {
        this.myLoan = reply;
        
      }, err => { console.log(err); this.validID = err.status; })
    })

  }

  backButton() {
    this._location.back();
  }
}
