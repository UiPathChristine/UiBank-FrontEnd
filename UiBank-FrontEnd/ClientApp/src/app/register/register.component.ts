import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../shared/user';
import { NgForm } from '@angular/forms';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public genderTypes: string[] = ["male", "female"];
  public employmentStatuses: string[] = ["Full-time", "Part-time", "Unemployed"];
  public maritalStatuses: string[] = ["Single", "Married", "Divorced", "Widowed"];
  public titles: string[] = ["ms", "mrs", "mr"];
  public newUser: User;
  public response: User;
  public failedRegistration: boolean = false;
  public httpError: HttpErrorResponse;

  constructor(private _location: Location, private route: Router, private registerService: RegisterService) { }

  ngOnInit() {

  }

  backButton() {
    this._location.back();
  }

  registerUser(form: NgForm): any {
    console.log(form.value);
    console.log("Creating new user" + this.newUser);
    this.newUser = form.value;
    this.newUser.type = "customer";


    this.registerService.registerNewUser(this.newUser).subscribe(
      res => {
        this.response = res;
        console.log('HTTP response', res);
        console.log('successful login');
        this.route.navigate(['register-account/success', this.response.username]);
      },
      err => {
        console.log('HTTP Error', err);
        this.httpError = err;
        console.log(this.httpError.error.error.message);
        alert(this.httpError.error.error.message);
        console.log('failed registration');
        this.failedRegistration = true;
      },
      () => console.log('HTTP request completed.'));

  }
}
