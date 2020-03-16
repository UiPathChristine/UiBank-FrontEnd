import { Injectable } from '@angular/core';
import { Loan } from '../shared/loan';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { TransferObject } from '../shared/TransferObject';

@Injectable({
  providedIn: 'root'
})
export class TransferMoneyService {
  currentAccounts: Observable<Account[]>;
  transferURL: string = "https://uibank-api.uipath.com/api/transactions";
  response: string;

  constructor(private http: HttpClient) { }

  transferMoney(transferObject: TransferObject): any {
    return this.http.post(this.transferURL, transferObject,
      {
        headers: new HttpHeaders({
          "Authorization": localStorage.getItem("sessionToken")
        })
      }
    ).pipe(map((response: Response) => {
      return response;
    })
    )
  }

}
