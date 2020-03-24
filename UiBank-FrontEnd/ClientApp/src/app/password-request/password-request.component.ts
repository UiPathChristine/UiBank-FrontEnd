import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { UserService } from '../profile/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-password-request',
  templateUrl: './password-request.component.html',
  styleUrls: ['./password-request.component.css']
})
export class PasswordRequestComponent implements OnInit {
  public loggedIn: boolean;
  public email: string;
  public httpError: HttpErrorResponse;
  public formObject = {
    email: ""
  }

  constructor(private userService: UserService, private route: Router, private _location: Location) { }

  ngOnInit() {

  }

  resetPassword(form: NgForm) {
    console.log(form.value);
    console.log("Logging in user" + form.value);
    this.formObject = form.value;
    this.email = this.formObject.email;
    this.userService.resetPassword(this.formObject).subscribe(
      res => {
        //this.authService.setLoggedInStatus(true);
        this.route.navigate(['password-request/confirmation', true]);
      },
      err => {
        console.log(err);
        this.httpError = err;
        this.route.navigate(['password-request/confirmation', false]);
      },
      () => console.log('Password Reset Request completed.'));
  }

  backButton() {
    this._location.back();
  }
}
