import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from './user';
import { JwtUserService } from './jwt_user_service';
import { Router } from "@angular/router";
import { JwtRefreshService } from './jwt_refresh_service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
 
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private router: Router, private http : HttpClient) {}

    static SKIP_INTERCEPTORS_HEADER = 'X-Skip-Angular-Interceptors';

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.headers.has(JwtInterceptor.SKIP_INTERCEPTORS_HEADER)) {
            return next.handle(request);
        }
        // add authorization header with jwt token if available
        let currentUser = JwtUserService.get<User>();
        if (currentUser && JwtUserService.valid<User>(currentUser)) {
            if (JwtUserService.inRefreshWindow(currentUser)) {
              var refresh_service = new JwtRefreshService(this.http);
              refresh_service.refresh(currentUser);
            }
            let newRequest = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
            return next.handle(newRequest).catch(
                // Oh hey, our token was revoked.
                (err: HttpErrorResponse) => {
                  if (this.router.url !== '/user_login' && err.status === 401) {
                    JwtUserService.remove();
                    this.router.navigate(['/user_login']);
                  }
                  return Observable.throw(err);
                }
            );
        } else {
            // Send me to the login page.
            return next.handle(request).catch(
                (err: HttpErrorResponse) => {
                  if (this.router.url !== '/user_login' && err.status === 401) {
                        this.router.navigate(['/user_login']);
                  }
                  return Observable.throw(err);
                }
            )
        }
    }
}