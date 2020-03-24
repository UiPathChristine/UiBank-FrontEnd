import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userURL: string = "https://uibank-api.azurewebsites.net/api/users/";
  passwordResetURL: string = "https://uibank-api.uipath.com/api/users/reset/";
  newPasswordResetURL: string = "https://uibank-api.uipath.com/api/users/reset-password/";
  userDetailSuffix: string = "";

  constructor(private http: HttpClient) { }

  getUserDetails(userID: string): Observable<User> {

    return this.http.get<User>(this.userURL + this.userDetailSuffix + userID,
      {
        headers: new HttpHeaders({
          "Authorization": localStorage.getItem("sessionToken")
        })
      }
    );
  }

  updateUserDetails(user: User): Observable<User> {

    return this.http.post<User>(this.userURL + this.userDetailSuffix, user,
    {
      headers: new HttpHeaders({
        "Authorization": localStorage.getItem("sessionToken")
      })
    })
  }


  resetPassword(email: any): any {
    console.log("reseting password...");
    console.log("in service here is email: " + email);
    return this.http.post(this.passwordResetURL, email).pipe(map((response: Response) => {
      return response;
    }));
  }

  resetNewPassword(newPassword: any, resetToken: string): any {
    console.log("setting new password...");
    console.log("in service here is password: " + newPassword);
    console.log("here is the reset token: " + resetToken)
    return this.http.post<User>(this.newPasswordResetURL, newPassword,
      {
        headers: new HttpHeaders({
          "Authorization": resetToken
        })
      })
  }


  test() {
    console.log("HELOOOOOOOOOOOOOOOOOOOOOOO");
  }
}
