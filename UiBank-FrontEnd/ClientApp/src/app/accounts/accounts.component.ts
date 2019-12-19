import { Component, OnInit } from '@angular/core';
import { Account } from "../shared/account";
import { AccountsService } from './accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  // variables
  currentAccounts[]: Account;


  constructor(private accountsService: AccountsService) {

  }

  ngOnInit() {
      this.currentAccounts = this.accountsService.getAccounts();
  }

}
