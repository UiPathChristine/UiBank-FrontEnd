import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';

@Component({
  selector: 'app-card-application',
  templateUrl: './card-application.component.html',
  styleUrls: ['./card-application.component.css']
})
export class CardApplicationComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }


  backButton() {
    this._location.back();
  }

}
