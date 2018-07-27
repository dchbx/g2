import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Router } from '@angular/router';
import { UserToken } from './user';
import { LoginAttempt } from './login_attempt';

@Injectable()
export class LoginService {
  public user: any;
  
  constructor(private http: HttpClient, private router: Router) {
  }
  
  login(login_attempt : LoginAttempt, return_url) {
    this.http.post('/login.json',
    {
      "user": {
        email: login_attempt.username,
        password: login_attempt.password
      }
    }, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    })
    .subscribe(
      (response:HttpResponse<any>) => {
         var auth_header = <string>response.headers.get("Authorization");
         var user_record = UserToken.parse(auth_header);
          // set token property
          // store username and jwt token in local storage to keep user logged in between page refreshes
          UserToken.store(user_record);
          this.router.navigateByUrl(return_url);
          login_attempt.errorMessage = '';
        },
      (err:HttpErrorResponse) => {
        login_attempt.errorMessage = err.error.error;
      }
    )
  }
  
  logout() {
    // clear token remove user from local storage to log user out
    UserToken.remove();
  }
}