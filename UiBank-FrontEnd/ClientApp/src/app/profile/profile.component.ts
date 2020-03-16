import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../shared/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: User = new User();
  constructor(private userService: UserService, private router: Router) { }

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

}
