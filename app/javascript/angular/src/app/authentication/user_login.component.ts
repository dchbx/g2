import { Component } from "@angular/core";
import { LoginService } from "./login_service";
import { ActivatedRoute } from "@angular/router";
import { LoginAttempt } from "./login_attempt";

@Component({
  templateUrl: './user_login.component.html',
  providers: [LoginService]
})
export class UserLoginComponent implements LoginAttempt {
  username : string = "";
  password : string = "";
  errorMessage = '';
  returnUrl : string = "/";

  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService) { }
  
  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  tryLogin() {
    this.loginService.login(this, this.returnUrl);
  }
}