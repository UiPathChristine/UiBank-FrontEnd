import { Component, OnInit } from '@angular/core';
import { Account } from "../shared/account";
import { AccountsService } from './accounts.service';
import { CsvDataService } from '../file-actions/csv-data.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  // variables
  currentAccounts: Account[];
  accountID: string = "123123";

  dataStuff = [
    {
      make: 'Toyota',
      model: 'Celica',
      price: 35000,
      soldOn: new Date(2019, 2, 1),
      lease: false,
      address: '100 main st, Mars'
    },
    {
      make: 'Porsche',
      model: 'Boxter',
      price: 72000,
      soldOn: new Date(2018, 12, 3),
      lease: true,
      address: '100 main st, Mars'
    },
    {
      make: 'Ford',
      model: 'Mondeo',
      price: 32000,
      soldOn: new Date(2018, 7, 23),
      lease: false,
      address: '100 main st, Mars'
    }
  ];

  blas = [
    {
      hi: 'hello',
      bye: 'bye'
    },
    {
      hi: 'howdy',
      bye: 'bya'
    },
    {
      hi: 'hello',
      bye: 'bye'
    },
    {
      hi: 'howdy',
      bye: 'bya'
    }

  ]


  constructor(private accountsService: AccountsService, private csvService: CsvDataService) {

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


  downloadCSV() {
    CsvDataService.exportToCsv('test.csv', this.dataStuff);

  }

}
