import { Injectable } from '@angular/core';
import { Loan } from '../shared/loan';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  currentAccounts: Observable<Account[]>;
  loanURL: string = "https://uibank-api.azurewebsites.net/api/";
  quotesSuffix: string = "quotes/newquote";
  getQuoteSuffix: string = "quotes/";
  response: string;

  constructor(private http: HttpClient) { }


  submitLoan(loan: Loan): any {

    return this.http.post(this.loanURL + this.quotesSuffix, loan).pipe(map((response: Response) => {
      return response;
    })
    )

  }


  // to get the loan informatoin from ID
  getLoanInfo(loanID: string): Observable<Loan> {
    console.log(loanID);
    console.log(this.loanURL + this.getQuoteSuffix + loanID);


    return this.http.get(this.loanURL + this.getQuoteSuffix + loanID);
  }

  handleError(error: HttpErrorResponse) {
    console.log("There was an HttpError");
  }

}
