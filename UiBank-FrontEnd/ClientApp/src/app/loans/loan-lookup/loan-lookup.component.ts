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
      this.route.navigate(['loans/detailView', this.quoteID.quoteID]);

    }, err => { console.log(err); this.route.navigate(['register']); });

    

  }

  backButton() {
    this._location.back();
  }
}
