import { Injectable } from '@angular/core';
import { Account } from '../shared/account';
import { ACCOUNTS } from '../shared/mock-account';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { Transaction } from '../shared/transaction';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  currentAccounts: Observable<Account[]>;
  accountsURLPrefix: string = "https://uibank-api.azurewebsites.net/api/accounts";
  transactionsURLPrefix: string = "https://uibank-api.azurewebsites.net/api/transactions";
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
    const filterString = "?filter[where][userId]=" + localStorage.getItem("userId");

      return this.http.get<Account[]>(this.accountsURLPrefix + filterString,
        {
          headers: new HttpHeaders({
            "Authorization": localStorage.getItem("sessionToken")
          })
        }
      );
  }

  createNewAccount(account: Account): any {
    return this.http.post(this.accountsURLPrefix, account, {
      headers: new HttpHeaders({
        "Authorization": localStorage.getItem("sessionToken")
      })
    }).pipe(map((response: Response) => {
      return response;
    }))
  }

  createInitialTransaction(transaction: Transaction): any {
    return this.http.post(this.transactionsURLPrefix, transaction, {
      headers: new HttpHeaders({
        "Authorization": localStorage.getItem("sessionToken")
      })
    }).pipe(map((response: Response) => {
      return response;
    }))
  }

  getTransactions(accountId: string): Observable<Transaction[]> {
    const filterString = "?filter[where][accountId]=" + accountId;

    return this.http.get<Transaction[]>(this.transactionsURLPrefix + filterString,
      {
        headers: new HttpHeaders({
          "Authorization": localStorage.getItem("sessionToken")
        })
      }
    );
  }

  getDisputedTransactions(accountId: string): Observable<Transaction[]> {
    const filterString = "?filter[where][accountId]=" + accountId + "&filter[where][dispute]=reported";

    return this.http.get<Transaction[]>(this.transactionsURLPrefix + filterString,
      {
        headers: new HttpHeaders({
          "Authorization": localStorage.getItem("sessionToken")
        })
      }
    );
  }



  getResolvedTransactions(accountId: string): Observable<Transaction[]> {
    const filterString = "?filter[where][accountId]=" + accountId + "?filter[where][or][0][dispute]=resolved&filter[where][or][1][dispute]=resolved-refunded";

    return this.http.get<Transaction[]>(this.transactionsURLPrefix + filterString,
      {
        headers: new HttpHeaders({
          "Authorization": localStorage.getItem("sessionToken")
        })
      }
    );
  }

  disputeTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(this.transactionsURLPrefix + "/" + transaction.id, transaction,
      {
        headers: new HttpHeaders({
          "Authorization": localStorage.getItem("sessionToken")
        })
      }
    );
  }

}
