import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public userLoggedIn: boolean;


  constructor() {
    //let token: string = localStorage.getItem("sessionToken");
    //console.log(token);
    //if (token == "" || token == undefined) {
    //  console.log("Invalid user for this page");
    //  this.userLoggedIn = true;
    //}
    //else {
    //  console.log("Valid user for this page");
    //  this.userLoggedIn = false;
    //}
  }

  // for jwt token
  //isUserAuthenticated() {
  //  let token: string = localStorage.getItem("jwt");
  //  if (token && !this.jwtHelper.isTokenExpired(token)) {
  //    return true;
  //  }
  //  else {
  //    return false;
  //  }
  //}

  // set it equal to a session storage?????? TO DO 
  getLoggedInStatus(): boolean {
    if (localStorage.getItem("userId") === null) {
      return false;
    } else {
      return true;
    }
  }

  setLoggedInStatus(status: boolean) {
    this.userLoggedIn = status;
  }

  isUserAuthenticated() {
    let token: string = localStorage.getItem("sessionToken");
    console.log(token);
    if (token == "" || token == undefined) {
      console.log("Invalid user for this page");
      this.userLoggedIn = true;
      return false;
    }
    else {
      console.log("Valid user for this page");
      this.userLoggedIn = false;
      return true;
    }
  }

  //canActivate() {
  //  let token: string = localStorage.getItem("sessionToken");
  //  console.log(token);
  //  if (token == "" || token == undefined) {
  //    console.log("Invalid user for this page");
  //    this.userLoggedIn = true;
  //    return false;
  //  }
  //  else {
  //    console.log("Valid user for this page");
  //    this.userLoggedIn = false;
  //    return true;
  //  }
  //}
}
