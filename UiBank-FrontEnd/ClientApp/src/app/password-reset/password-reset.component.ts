import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { UserService } from '../profile/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  public loggedIn: boolean;
  public email: string;
  public httpError: HttpErrorResponse;
  public matching: string = "";
  public formObject = {
    newPassword: "",
    confirmNewPassword: ""
  }

  public submitObject = {
    newPassword: ""
  }
  public resetToken: string;

  constructor(private userService: UserService, private route: Router, private activatedRoute: ActivatedRoute, private _location: Location) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.resetToken = queryParams['access_token'];
      console.log(this.resetToken);
    })
  }

  resetPassword(form: NgForm) {
    console.log(form.value);
    console.log("Logging in user" + form.value);
    this.formObject = form.value;
    if (this.formObject.newPassword !== this.formObject.confirmNewPassword) {
      this.matching = "Passwords Don't Match!"
    } else {

      this.submitObject.newPassword = this.formObject.newPassword;
      this.userService.resetNewPassword(this.submitObject, this.resetToken).subscribe(
        res => {
          //this.authService.setLoggedInStatus(true);
          this.route.navigate(['reset-password/confirmation', true]);
        },
        err => {
          console.log(err);
          this.httpError = err;
          this.route.navigate(['reset-password/confirmation', false]);
        },
        () => console.log('Password Reset Request completed.'));
    }



  }

  backButton() {
    this._location.back();
  }
}
