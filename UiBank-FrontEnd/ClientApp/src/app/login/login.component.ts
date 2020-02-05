import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  //login(form: NgForm) {
  //  let credentials = JSON.stringify(form.value);
  //  this.http.post("http://localhost:5000/api/auth/login", credentials, {
  //    headers: new HttpHeaders({
  //      "Content-Type": "application/json"
  //    })
  //  }).subscribe(response => {
  //    let token = (<any>response).token;
  //    localStorage.setItem("jwt", token);
  //    this.invalidLogin = false;
  //    this.router.navigate(["/"]);
  //  }, err => {
  //    this.invalidLogin = true;
  //  });
  //}

}
