import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtHelper: JwtHelperService, private router: Router) {
  }
  canActivate() {
    //// for jwt stuff
    //var token = localStorage.getItem("jwt");
    var token = localStorage.getItem("sessionToken");


    // for jwt stuff
    //if (token && !this.jwtHelper.isTokenExpired(token)) {
    //  console.log(this.jwtHelper.decodeToken(token));
    //  return true;
    //}

    if (token == "" || token == undefined) {
      console.log("Invalid user for this page");
      return false;
    }
    else {
      console.log("Valid user for this page");
      return true;
    }
  }

}
