import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Location } from '@angular/common';


@Component({
  selector: 'app-account-create-results',
  templateUrl: './account-create-results.component.html',
  styleUrls: ['./account-create-results.component.css']
})
export class AccountCreateResultsComponent implements OnInit {
  public accountId: string;
  public friendlyName: string;
  public sub: any;

  constructor( private _location: Location, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.accountId = params['accountId'];
      this.friendlyName = params['friendlyName'];
    });
  }

  backButton() {
    this._location.back();
  }

}
