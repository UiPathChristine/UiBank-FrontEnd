import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-account-apply',
  templateUrl: './account-apply.component.html',
  styleUrls: ['./account-apply.component.css']
})
export class AccountApplyComponent implements OnInit {
  public accountTypes: string[] = ["checking", "savings"];

  constructor(private _location: Location, private route: Router) { }

  ngOnInit() {
  }

  backButton() {
    this._location.back();
  }

  registerNewAccount(form: NgForm) {

  }

}
