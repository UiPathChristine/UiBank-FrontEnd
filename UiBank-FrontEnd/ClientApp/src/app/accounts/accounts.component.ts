import { Component, OnInit } from '@angular/core';
import { Account } from "../shared/account";
import { AccountsService } from './accounts.service';
import { CsvDataService } from '../file-actions/csv-data.service';

import { Location } from '@angular/common';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  // variables
  currentAccounts: Account[];
  accountID: string = "123123";

  constructor(private _location: Location,  private accountsService: AccountsService, private csvService: CsvDataService) {

  }

  ngOnInit() {


    this.accountsService.getAccounts()
      .subscribe(accounts =>
        this.currentAccounts = accounts
    );

  

  }

  trimID(id: string) {
    const newID = id.substring(id.length - 4, id.length);
    return newID;
  }

  backButton() {
    this._location.back();
  }

  //downloadCSV() {
  //  CsvDataService.exportToCsv('test.csv', this.dataStuff);

  //}

}
