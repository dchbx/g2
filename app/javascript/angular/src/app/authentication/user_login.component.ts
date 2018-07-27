import { Component } from "@angular/core";
import { LoginService } from "./login_service";
import { ActivatedRoute } from "@angular/router";

@Component({
  templateUrl: './user_login.component.html',
  providers: [LoginService]
})
export class UserLoginComponent {
  username : string = "";
  password : string = "";
  error = '';
  returnUrl : string = "/";

  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService) { }
  
  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  tryLogin() {
    this.loginService.login(this.username, this.password, this.returnUrl);
  }
}