import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { User } from './user';
import { JwtUserService } from "./jwt_user_service";
import { JwtInterceptor } from "./jwt_interceptor";

export class JwtRefreshService {
  public user: any;
  
  constructor(private http: HttpClient) {
  }
  
  refresh(user: User) {
    var requestHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`
    });
    var fullHeaders = requestHeaders.set(JwtInterceptor.SKIP_INTERCEPTORS_HEADER, "true");
    this.http.get('/refresh_token.json', {
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
        },
      (err:HttpErrorResponse) => {
        console.log(JSON.stringify(err));
      }
    )
  }
}