import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  public loggedIn: boolean;

  constructor(private _location: Location) { }

  ngOnInit() {
   
  }

  resetPassword(form: NgForm) {

  }

  backButton() {
    this._location.back();
  }
}
