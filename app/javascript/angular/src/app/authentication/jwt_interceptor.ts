import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from './user';
import { JwtUserService } from './jwt_user_service';
 
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = JwtUserService.get<User>();
        if (currentUser && JwtUserService.valid<User>(currentUser)) {
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