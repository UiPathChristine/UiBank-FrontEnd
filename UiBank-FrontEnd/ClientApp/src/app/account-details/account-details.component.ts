import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoanService } from '../loans/loan.service';
import { Location, DatePipe } from '@angular/common';
import { CsvDataService } from '../file-actions/csv-data.service';
// import core lib
import * as pdfMake from 'pdfmake/build/pdfmake';
import { AccountsService } from '../accounts/accounts.service';
import { Transaction } from '../shared/transaction';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  public sub: any;
  public accountID: string;
  public validAccount: boolean;
  public accountBalance: string;
  public todaysDate: string;
  public today: Date = new Date();
  public amounts: string[];
  public descriptions: string[];
  public accountName: string;
  

  public transactions: Transaction[];
  

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private loanService: LoanService,
    private accountsService: AccountsService
  ) { }

  ngOnInit() {
    var dd = String(this.today.getDate()).padStart(2, '0');
    var mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = this.today.getFullYear();

    this.todaysDate = mm + '/' + dd + '/' + yyyy;

    this.sub = this.route.params.subscribe(params => {
      this.accountID = params['accountID'];
      this.accountBalance = params['balance'];
      this.accountName = params['accountName'];
    });

    this.accountsService.getTransactions(this.accountID)
      .subscribe((transactions: Transaction[] ) => {
        this.transactions = transactions;
        this.amounts = transactions.map(a => a.amount.toString());
        this.descriptions = transactions.map(a => a.description);
        console.log(this.amounts.length)
      });


  }

  downloadCSV() {
    CsvDataService.exportToCsv('transactionData_' + this.todaysDate + '.csv', this.transactions);

  }

  submitTransfer() {

  }


  generatePdf() {
    const bodyData = this.createTableData();
    var dd = {
      content: [
        {
          text: 'UiBank Statement of Accounts\n\n\n',
          style: 'header',
          alignment: 'right',
          color: '#0067DF'
        },
        {
          text: 'Account No: ' + this.accountID + "\nName of Account: " + this.accountName,
          alignment: 'right'
        },
        {
          text: 'New York account terms and conditions apply',
          alignment: 'right',
          color: '#888888',
          fontSize: 12,
        },
        {
          text: 'UiBank\n',
          style: 'header',
          alignment: 'left'
        },
        {
          text: '90 Park Ave\n 20th floor\n New York, NY 10016\n\n\n',
          alignment: 'left'
        },
        {
          table: {
            widths: ['*'],
            body: [[" "], [" "]]
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 0 : 2;
            },
            vLineWidth: function (i, node) {
              return 0;
            },
          }
        },
        {
          text: 'Transaction History \n\n',
          style: 'header',
          alignment: 'left'
        },
        {
          table: {
            widths: [80, 200, 80, '*'],
            body: bodyData
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        bigger: {
          fontSize: 15,
          italics: true
        }
      }
    }
  
    pdfMake.createPdf(dd).open();
  }

  createTableData(): any {
    var bodyData = [];
    var dataRow = [];

    dataRow.push("Date");
    dataRow.push("Description");
    dataRow.push("Amount");
    dataRow.push("Balance");

    bodyData.push(dataRow);

    this.transactions.forEach(function (sourceRow) {
      var dataRow = [];

      const tempDate = sourceRow.date.split("T");
      const tempDateSubstring = tempDate[0];
      const day = tempDateSubstring.split("-")[2];
      const month = tempDateSubstring.split("-")[1];
      const year = tempDateSubstring.split("-")[0];




      dataRow.push(month + "/" + day + "/" + year);
      if (sourceRow.description === undefined || sourceRow.description === "") {
        dataRow.push(" ");
      } else {
        dataRow.push(sourceRow.description);
      }

      if (sourceRow.type === "debit") {
        dataRow.push("-" + sourceRow.amount);
      } else {
        dataRow.push(sourceRow.amount);
      }

      dataRow.push(sourceRow.balance);

      bodyData.push(dataRow);
    })

    return bodyData;
  }

  public dd = {
    content: [
      {
        text: 'UiBank Statement of Accounts',
        style: 'header',
        alignment: 'right',
        color: '#0067DF'
      },
      {
        style: 'tableExample',
        table: {
          widths: [100, '*', 200, '*'],
          body: [
            ['width=100', 'star-sized', 'width=200', 'star-sized'],
            ['fixed-width cells have exactly the specified width', { text: 'nothing interesting here', italics: true, color: 'gray' }, { text: 'nothing interesting here', italics: true, color: 'gray' }, { text: 'nothing interesting here', italics: true, color: 'gray' }]
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          body: [
            this.amounts,
            ['One value goes here', 'Another one here', 'OK?']
          ]
        }
      },
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam.\n\n',
      {
        text: 'Subheader 1 - using subheader style',
        style: 'subheader'
      },
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.\n\n',
      {
        text: 'Subheader 2 - using subheader style',
        style: 'subheader'
      },
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.\n\n',
      {
        text: 'It is possible to apply multiple styles, by passing an array. This paragraph uses two styles: quote and small. When multiple styles are provided, they are evaluated in the specified order which is important in case they define the same properties',
        style: ['quote', 'small']
      }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true
      },
      subheader: {
        fontSize: 15,
        bold: true
      },
      quote: {
        italics: true
      },
      small: {
        fontSize: 8
      }
    }

  }




  backButton() {
    this._location.back();
  }
}
