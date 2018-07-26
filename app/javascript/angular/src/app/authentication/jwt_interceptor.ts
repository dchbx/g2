import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
 
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUserJson = localStorage.getItem('currentUser');
        if (!currentUserJson) {
          return next.handle(request);
        }
        let currentUser = JSON.parse(currentUserJson);
        if (currentUser && currentUser.token) {
            let newRequest = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
            return next.handle(newRequest);
        } else {
            return next.handle(request);
        }
    }
}