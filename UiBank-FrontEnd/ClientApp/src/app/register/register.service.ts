import { Injectable } from '@angular/core';
import { Loan } from '../shared/loan';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  currentAccounts: Observable<Account[]>;
  loanURL: string = "https://uibank-api.azurewebsites.net/api/users/";
  quotesSuffix: string = "users/";
  getQuoteSuffix: string = "quotes/";
  response: string;

  constructor(private http: HttpClient) { }


  registerNewUser(user: User): any {

    return this.http.post(this.loanURL, user).pipe(map((response: Response) => {
      return response;
    }))

  }

  handleError(error: HttpErrorResponse) {
    console.log("There was an HttpError");
  }

}



