import { Injectable } from '@angular/core';
import { Account } from '../shared/account';
import { ACCOUNTS } from '../shared/mock-account';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  currentAccounts: Observable<Account[]>;
  accountsURLPrefix: string = "https://uibank-api.azurewebsites.net/api/accounts";
  accountURLSuffix: string = "/accounts";
  handleError;
  customers: any;

  constructor(private http: HttpClient) { }

  //getAccounts(): Promise<Account[]> {

  //  return this.http.get(this.accountsURLPrefix + "1" + this.accountURLSuffix)
  //    .toPromise()
  //    .then(response => this.currentAccounts = response)
  //    .catch(this.handleError);

  //  return this.http.get(this.accountsURLPrefix + "1" + this.accountURLSuffix)
  //    .subscribe(response => this.currentAccounts = response)
  //    .catch(this.handleError);


  //  return Promise.resolve(ACCOUNTS);
  //}

  getAccounts(): Observable<Account[]> {

      return this.http.get<Account[]>(this.accountsURLPrefix,
        {
          headers: new HttpHeaders({
            "Authorization": localStorage.getItem("sessionToken")
          })
        }
      );



  }

  

}
