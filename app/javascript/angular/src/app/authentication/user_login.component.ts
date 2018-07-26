import { Component } from "@angular/core";
import { LoginService } from "./login_service";

@Component({
  templateUrl: './user_login.component.html',
  providers: [LoginService]
})
export class UserLoginComponent {
  username : string = "";
  password : string = "";
  error = '';

  constructor(private loginService: LoginService) { }

  tryLogin() {
    this.loginService.login(this.username, this.password);
  }
}