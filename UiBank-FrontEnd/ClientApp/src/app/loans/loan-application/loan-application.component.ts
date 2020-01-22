import { Component, OnInit } from '@angular/core';
import { LoanService } from '../loan.service';
import { Loan } from '../../shared/loan';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-loan-application',
  templateUrl: './loan-application.component.html',
  styleUrls: ['./loan-application.component.css']
})
export class LoanApplicationComponent implements OnInit {
  public currentLoan: Loan;
  public response = {
    accepted: true,
    rate: 1,
    quoteid: ""

  }
  public termDates: number[] = [1, 3, 5, 10];
  constructor(private _location: Location, private route: Router, private loanService: LoanService) { }

  ngOnInit() {

  }

  backButton() {
    this._location.back();
  }

  submitApplication(form: NgForm): any {
    console.log(form.value);
    this.currentLoan = form.value;
    this.currentLoan.term = Number(this.currentLoan.term);
    
    this.loanService.submitLoan(form.value).subscribe(reply => {
      this.response = reply;
      console.log(this.response.quoteid);

      if (this.response.accepted == false) {
        this.response.rate = 0;
        this.response.quoteid = "";
      }

      this.route.navigate(['loans/result', this.response.quoteid, this.response.rate, this.response.accepted]);
      

    });
  }


}
