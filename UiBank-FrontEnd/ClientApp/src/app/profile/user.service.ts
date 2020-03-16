import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userURL: string = "https://uibank-api.azurewebsites.net/api/users/";
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


  test() {
    console.log("HELOOOOOOOOOOOOOOOOOOOOOOO");
  }
}
