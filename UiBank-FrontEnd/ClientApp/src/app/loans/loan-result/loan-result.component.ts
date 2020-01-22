import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';

@Component({
  selector: 'app-loan-result',
  templateUrl: './loan-result.component.html',
  styleUrls: ['./loan-result.component.css']
})
export class LoanResultComponent implements OnInit {
  public loanID: string;
  public rate: number;
  public accepted: boolean;
  private sub: any;
  public acceptedString: string;

  constructor(private _location: Location, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.loanID = params['loanID']; // (+) converts string 'id' to a number
      this.rate = +params['rate'];
      this.accepted = params['success'];
 
    });

      // In a real app: dispatch action to load the details here.
  }

  backButton() {
    this._location.back();
  }

}
