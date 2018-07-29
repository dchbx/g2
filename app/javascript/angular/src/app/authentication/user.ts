import { JwtUserBase } from "./jwt_user_service";

export interface User extends JwtUserBase {
  sub: string
  email: string
  iat: number
}