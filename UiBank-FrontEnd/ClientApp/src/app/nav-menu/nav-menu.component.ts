import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  loggedIn: boolean = false;

  constructor(private router: Router, public authService: AuthenticationService) { }

  ngOnInit() {
    this.loggedIn = this.authService.getLoggedInStatus();

  }

  logoutUser() {
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("userId");

    this.loggedIn = false;
    this.router.navigate(["/"]);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
