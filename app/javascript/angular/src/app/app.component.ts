import { Component } from '@angular/core';
import { LoginService } from './authentication/login_service';
import { JwtUserService } from './authentication/jwt_user_service';
import { User } from './authentication/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [require('./styles/app.component.css')],
  providers: [LoginService]
})
export class AppComponent {

  constructor(private login_service : LoginService) { }

  userLoggedIn() {
    return JwtUserService.hasValidToken();
  }

  userName() {
    var currentUser = JwtUserService.get<User>();
    if (currentUser) {
      return currentUser.email;
    } else {
      return "null";
    }
  }

  logout() {
    this.login_service.logout();
  }
}
