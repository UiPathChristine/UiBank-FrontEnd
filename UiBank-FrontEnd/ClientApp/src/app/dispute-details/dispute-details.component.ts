import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dispute-details',
  templateUrl: './dispute-details.component.html',
  styleUrls: ['./dispute-details.component.css']
})
export class DisputeDetailsComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }

  backButton() {
    this._location.back();
  }

}
