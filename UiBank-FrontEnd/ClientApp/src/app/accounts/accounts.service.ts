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
  accountsURLPrefix: string = "https://virtserver.swaggerhub.com/uibank-api/uibank/1.0.2/customer/";
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

  getAccounts(): any {

    //return this.http.get(this.accountsURLPrefix + "1" + this.accountURLSuffix)
    //  .toPromise()
    //  .then(response => this.currentAccounts = response)
    //  .catch(this.handleError);

    //return this.http.get(this.accountsURLPrefix + "1" + this.accountURLSuffix)
    //  .subscribe(response => this.currentAccounts = response)
    //  .catch(this.handleError);

    return this.http.get(this.accountsURLPrefix + "1" + this.accountURLSuffix);

    //let token = localStorage.getItem("jwt");
    //return this.http.get<Account[]>(this.accountsURLPrefix + "1" + this.accountURLSuffix, {
    //  headers: new HttpHeaders({
    //    "Content-Type": "application/json"
    //  })
    //});


    //return this.http.get(this.accountsURLPrefix + "1" + this.accountURLSuffix)
    //  .subscribe(res => { this.currentAccounts = res; });


    //let token = localStorage.getItem("jwt");
    //return this.http.get("http://localhost:5000/api/customers", {
    //  headers: new HttpHeaders({
    //    "Content-Type": "application/json"
    //  })
    //}).subscribe(response => {
    //  this.customers = response;
      
    //}, err => {
    //    console.log(err)
       
    //});


  }

  

}
