import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Router } from '@angular/router';
import { User, UserToken } from './user';

@Injectable()
export class LoginService {
  public user: any;
  public errorMessage: any;
  
  constructor(private http: HttpClient, private router:Router ) {
  }
  
  login(user_email, user_password) {
    this.http.post('/login.json',
    {
      "user": {
        email: user_email,
        password: user_password
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
          // return true to indicate successful login
          this.router.navigate(['/']);
          this.errorMessage = '';
        },
      err => console.log(err)
    )
  }
  
  logout() {
    // clear token remove user from local storage to log user out
    UserToken.remove();
  }
}