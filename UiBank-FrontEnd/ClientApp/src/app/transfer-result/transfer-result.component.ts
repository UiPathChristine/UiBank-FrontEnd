import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';

@Component({
  selector: 'app-transfer-result',
  templateUrl: './transfer-result.component.html',
  styleUrls: ['./transfer-result.component.css']
})
export class TransferResultComponent implements OnInit {
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
