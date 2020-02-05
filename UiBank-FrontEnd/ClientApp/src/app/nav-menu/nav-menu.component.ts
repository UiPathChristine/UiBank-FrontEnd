import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  loggedIn: boolean = false;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.loggedIn = this.authService.getLoggedInStatus();
  }

  logoutUser() {
    console.log("we've been logged out")
    localStorage.removeItem("sessionToken");
    this.authService.setLoggedInStatus(false);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
