import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { UserService } from '../profile/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  currentUser: User = new User();
  response: User;
  httpError: HttpErrorResponse;

  constructor(private _location: Location, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.test();
    var sessionToken = localStorage.getItem("sessionToken");
    var userId = localStorage.getItem("userId");
    console.log("profile user ID: " + userId);
    this.userService.getUserDetails(userId).subscribe(reply => {
      this.currentUser = reply;
      console.log(this.currentUser);
      //this.router.navigate(['loans/detailView', this.quoteID.quoteID]);
    }, err => { console.log(err); });
  }

  backButton() {
    this._location.back();
  }

  updateUserInfo(form: NgForm) {

    this.userService.updateUserDetails(this.currentUser).subscribe(
      res => {
        this.response = res;
        console.log('HTTP response', res);
        console.log('successful update');
        this.router.navigate(['userProfile']);
      },
      err => {
        console.log('HTTP Error', err);
        this.httpError = err;
        console.log(this.httpError.error.error.message);
        alert(this.httpError.error.error.message);
        console.log('failed updating');
      },
      () => console.log('HTTP request completed.'));

  }

}
