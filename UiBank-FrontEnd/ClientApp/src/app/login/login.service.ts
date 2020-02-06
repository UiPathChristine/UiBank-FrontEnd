import { Injectable } from '@angular/core';
import { Loan } from '../shared/loan';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { User } from '../shared/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentAccounts: Observable<Account[]>;
  loginURL: string = "https://www.pokerrat.co.uk:3000/api/users/login/";
  quotesSuffix: string = "users/";
  getQuoteSuffix: string = "quotes/";
  response: string;
  invalidLogin: boolean = false;
  loggingInUser: User;

  constructor(private http: HttpClient, private router: Router) { }


  loginUser(user: any): any {

    return this.http.post(this.loginURL, user).pipe(map((response: Response) => {
      console.log(response.status)

      return response;
    }));

  }

  login(userData: any): any {
    console.log("in login service");
    let credentials = JSON.stringify(userData.value);
    this.loggingInUser = userData;
    console.log(this.loggingInUser);
    return this.http.post("https://uibank-api.azurewebsites.net/api/users/login", userData, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })

    //  .subscribe(response => {
    //  let token = (<any>response).token;
    //  console.log("mytoken" + token);
    //  localStorage.setItem("jwt", token);
    //  this.invalidLogin = false;
    //  this.router.navigate(["/"]);
    //}, err => {
    //    console.log("error message");
    //  this.invalidLogin = true;
    //});
  }

  loginWithToken(user: any): any {
    console.log("validating user login...");
    return this.http.post(this.loginURL, user).pipe(map((response: Response) => {
      console.log(response.status)

      return response;
    }));
  }


  logOut() {
    localStorage.removeItem("sessionToken");
  }

  handleError(error: HttpErrorResponse) {
    
    console.log("There was an HttpError");
  }

}



