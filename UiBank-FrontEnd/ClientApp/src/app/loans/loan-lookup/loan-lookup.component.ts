import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoanService } from '../loan.service';
import { Loan } from '../../shared/loan';

import { Location } from '@angular/common';

@Component({
  selector: 'app-loan-lookup',
  templateUrl: './loan-lookup.component.html',
  styleUrls: ['./loan-lookup.component.css']
})
export class LoanLookupComponent implements OnInit {

  public myLoan: Loan;
  public quoteID = {
     quoteID: ""
  };

  constructor(private _location: Location, private route: Router, private loanService: LoanService) { }

  ngOnInit() {
  }

  getLoanInfo(form: NgForm): any {
    console.log(form.value);
    this.quoteID = form.value;

    this.loanService.getLoanInfo(this.quoteID.quoteID).subscribe(reply => {
      this.myLoan = reply;
      const isValid: boolean = true;
      this.route.navigate(
        [
          'loans/detailView',
          isValid,
          this.quoteID.quoteID,
          this.myLoan.term,
          this.myLoan.amount,
          this.myLoan.rate,
          this.myLoan.age,
          this.myLoan.income
        ]
      );

    }, err => { console.log(err); console.log('passing false'); this.route.navigate(['loans/detailView', false, this.quoteID.quoteID]); });

    

  }

  backButton() {
    this._location.back();
  }
}
