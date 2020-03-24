import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from '../auth/authentication.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  public userLoginInfo = {
    username: "",
    password: ""
  }
  public failedLogin: boolean = false;
  public httpError: HttpErrorResponse;
  public errorMessage: string;
  public response: any;


  constructor(public authService: AuthenticationService, private jwtHelper: JwtHelperService, private http: HttpClient, private loginService: LoginService, private route: Router) { }

  ngOnInit() {
    console.log(localStorage.getItem("sessionToken"));
  }

  //isUserAuthenticated() {
  //  let token: string = localStorage.getItem("jwt");
  //  if (token && !this.jwtHelper.isTokenExpired(token)) {
  //    return true;
  //  }
  //  else {
  //    return false;
  //  }
  //}

  loginUser(form: NgForm): any {
    console.log(form.value);
    console.log("Logging in user" + form.value);
    this.userLoginInfo = form.value;

    this.loginService.login(this.userLoginInfo)
      .subscribe(
        res => {
          console.log('HTTP response', res);
          console.log('successful login');
          console.log('returned token', res.id);
          localStorage.setItem("sessionToken", res.id);
          localStorage.setItem("userId", res.userId);
          
          //this.authService.setLoggedInStatus(true);
        this.route.navigate(['accounts']);
      },
        err => {
          this.httpError = err;
          this.httpError.error.error.message;
          console.log('HTTP Error', err);
          console.log('failed login');
          if (this.httpError.status === 403) {
            console.log("accoutn locked");
          }
          this.failedLogin = true;
      },
      () => console.log('HTTP request completed.'));
  }



  //login(form: NgForm) {
  //  let credentials = JSON.stringify(form.value);
  //  this.http.post("http://localhost:5000/api/auth/login", credentials, {
  //    headers: new HttpHeaders({
  //      "Content-Type": "application/json"
  //    })
  //  }).subscribe(response => {
  //    let token = (<any>response).token;
  //    localStorage.setItem("jwt", token);
  //    this.invalidLogin = false;
  //    this.router.navigate(["/"]);
  //  }, err => {
  //    this.invalidLogin = true;
  //  });
  //}

}
