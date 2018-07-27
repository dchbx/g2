import { Maybe } from "../../lib/maybe"

export interface User {
  sub: string
  email: string
  iat: number
  token: string
  exp: number
}

export class UserToken {
  static parse(header_string: string) : User {
    var raw_token = header_string.replace(/^Bearer /, "");
    var token_parts = raw_token.split(".");
    var body = token_parts[1];
    var user = <User>JSON.parse(atob(body));
    user.token = raw_token;
    return user;
  }

  static get() : Maybe<User>{
    var cu_string = localStorage.getItem("currentUser");
    return cu_string ? <User>JSON.parse(cu_string) : null;
  }

  static store(user : User) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  }

  static remove() {
    localStorage.removeItem("currentUser");
  }

  static hasValidToken() : boolean {
    var user = UserToken.get();
    if (!user) { 
      return false;
    }
    return UserToken.valid(user);
  }

  static valid(user: User) : boolean {
    var now_time = Math.floor(Date.now() / 1000);
    return(user.exp > now_time);
  }
}