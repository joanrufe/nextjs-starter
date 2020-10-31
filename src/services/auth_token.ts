import jwtDecode from "jwt-decode";
import Cookie from 'js-cookie';

export type DecodedToken = {
  readonly email: string;
  readonly exp: number;
}

export const TOKEN_STORAGE_KEY = "myApp.authToken";

export class AuthToken {
  readonly decodedToken: DecodedToken;

  constructor(readonly token?: string) {
    // we are going to default to an expired decodedToken
    this.decodedToken = { email: "", exp: 0 };

    // then try and decode the jwt using jwt-decode
    try {
      if (token) this.decodedToken = jwtDecode(token);
    } catch (e) {
      // Redirect?
    }
  }
  // No se usa
  get authorizationString() {
    return `Bearer ${this.token}`;
  }

  get expiresAt(): Date {
    return new Date(this.decodedToken.exp * 1000);
  }

  get isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  get isValid(): boolean {
    return !this.isExpired;
  }

  static storeToken(token: string) {
    Cookie.set(TOKEN_STORAGE_KEY, token);
  }
}
