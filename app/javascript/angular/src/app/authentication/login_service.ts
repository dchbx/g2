import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Router } from '@angular/router';

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
          var user_record = response.body;
          user_record["token"] = this.extract_jwt_from_header(response.headers);
          // set token property
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(response.body));
          // return true to indicate successful login
          this.router.navigate(['/']);
          this.errorMessage = '';
        },
      err => console.log(err)
    )
  }
  
  logout() {
    // clear token remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  extract_jwt_from_header(headers) : string {
    var auth_header = <string>headers.get("Authorization");
    return auth_header.replace(/^Bearer /, "");
  }
}