import { Injectable } from '@angular/core';
import { Account } from '../shared/account';
import { ACCOUNTS } from '../shared/mock-account';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  currentAccounts: Observable<Account[]>;
  accountsURLPrefix: string = "https://virtserver.swaggerhub.com/uibank-api/uibank/1.0.2/customer/";
  accountURLSuffix: string = "/accounts";
  handleError;

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

    //return this.http.get(this.accountsURLPrefix + "1" + this.accountURLSuffix)
    //  .toPromise()
    //  .then(response => this.currentAccounts = response)
    //  .catch(this.handleError);

    //return this.http.get(this.accountsURLPrefix + "1" + this.accountURLSuffix)
    //  .subscribe(response => this.currentAccounts = response)
    //  .catch(this.handleError);

    //return this.http.get(this.accountsURLPrefix + "1" + this.accountURLSuffix)
    //  .subscribe((accounts: Account[]) => {
    //    this.currentAccounts = accounts;
    //  })


    return this.http.get<Account[]>(this.accountsURLPrefix + "1" + this.accountURLSuffix);


    //return this.http.get(this.accountsURLPrefix + "1" + this.accountURLSuffix)
    //  .subscribe(res => { this.currentAccounts = res; });

  }

}
