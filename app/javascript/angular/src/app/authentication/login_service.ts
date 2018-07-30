import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Router } from '@angular/router';
import { User } from './user';
import { JwtUserService } from "./jwt_user_service";
import { JwtInterceptor } from "./jwt_interceptor";
import { LoginAttempt } from './login_attempt';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {
  }
  
  login(login_attempt : LoginAttempt, return_url) {
    var requestHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    var fullHeaders = requestHeaders.set(JwtInterceptor.SKIP_INTERCEPTORS_HEADER, "true");
    this.http.post('/login.json',
    {
      "user": {
        email: login_attempt.username,
        password: login_attempt.password
      }
    }, {
      headers: fullHeaders,
      observe: 'response'
    })
    .subscribe(
      (response:HttpResponse<any>) => {
         var auth_header = <string>response.headers.get("Authorization");
         var user_record = JwtUserService.parse<User>(auth_header);
          // set token property
          // store username and jwt token in local storage to keep user logged in between page refreshes
          JwtUserService.store<User>(user_record);
          this.router.navigateByUrl(return_url);
          login_attempt.errorMessage = '';
        },
      (err:HttpErrorResponse) => {
        console.log(err.error.error);
        login_attempt.errorMessage = err.error.error;
      }
    )
  }
  
  logout() {
    // clear token remove user from local storage to log user out
    var currentUser = JwtUserService.get<User>();
    if (currentUser) {
      var requestHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}`
      });
      var fullHeaders = requestHeaders.set(JwtInterceptor.SKIP_INTERCEPTORS_HEADER, "true");
      this.http.delete('/logout.json',
      {
        headers: fullHeaders,
        observe: 'response'
      })
      .subscribe(
        (response:HttpResponse<any>) => {
            JwtUserService.remove();
            this.router.navigate(['/user_login']);
          },
        (err:HttpErrorResponse) => {
          JwtUserService.remove();
          this.router.navigate(['/user_login']);
        }
      )
    } else {
      this.router.navigate(['/user_login']);
    }
  }
}