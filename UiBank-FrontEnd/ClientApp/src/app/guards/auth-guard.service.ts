import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private jwtHelper: JwtHelperService, private router: Router) {
  }
  canActivate() {
    //// for jwt stuff
    //var token = localStorage.getItem("jwt");
    var token = localStorage.getItem("sessionToken");

    //for jwt stuff
    //if (token && !this.jwtHelper.isTokenExpired(token)) {
    //  console.log(this.jwtHelper.decodeToken(token));
    //  return true;
    //}

    //this.router.navigate([""]);
    //return false;
    if (!this.authService.getLoggedInStatus) {
      console.log("Invalid user for this page");
      return false;
    }
    else {
      console.log("Valid user for this page");
      return true;
    }
  }

}
