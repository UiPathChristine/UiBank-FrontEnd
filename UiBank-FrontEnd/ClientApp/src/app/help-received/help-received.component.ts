import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-help-received',
  templateUrl: './help-received.component.html',
  styleUrls: ['./help-received.component.css']
})
export class HelpReceivedComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }

  backButton() {
    this._location.back();
  }

}
