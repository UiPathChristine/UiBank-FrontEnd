import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoanService } from '../loans/loan.service';
import { Location } from '@angular/common';
import { CsvDataService } from '../file-actions/csv-data.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as pdfMakeConfig from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

// import core lib
import * as pdfMake from 'pdfmake/build/pdfmake';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  public sub: any;
  public accountID: string;
  public validAccount: boolean;
  

  public transactions = [
    {
      accountId: '1111',
      balance: 100.12,
      TranfertoAccountId: '1221',
      amount: 312.24,
      description: 'HOMEDEPOTSTORE 0012 22229292',
      ref: 'no idea',
      dispute: 'false',
      type: 'checking'
    },
    {
      accountId: '1111',
      balance: 120.12,
      TranfertoAccountId: '1221',
      amount: 12.00,
      description: 'HOMEDEPOTSTORE 0012 222234292',
      ref: 'no idea',
      dispute: 'false',
      type: 'checking'
    }
  ]
  

  constructor(private _location: Location, private route: ActivatedRoute, private loanService: LoanService) { }

  generatePdf() {
    const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    pdfMake.createPdf(documentDefinition).open();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.accountID = params['accountID'];

    });
  }

  htmltoPDF() {
    // parentdiv is the html element which has to be converted to PDF
    let data = document.getElementById('parentdiv');
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'cm', 'a4'); //Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);
      pdf.save('Filename.pdf');
    }); 

  }

  transferMoney() {
    console.log('new funcitn');
  }

  downloadCSV() {
    CsvDataService.exportToCsv('transactionData.csv', this.transactions);

  }

}
