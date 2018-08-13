import { Injectable } from "@angular/core";
import {
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router
} from "@angular/router";
import { Observable } from "rxjs/Observable";
import { JwtUserService } from "./jwt_user_service";

@Injectable()
export class UserAuthenticated implements CanActivate {
  constructor(private router : Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (JwtUserService.hasValidToken()) {
      return true;
    }
    this.router.navigate(['/user_login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}